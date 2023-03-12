import * as fs from 'fs/promises';
import * as path from 'path';
import { promisify } from 'util';
import { SpanOrStandaloneOrString, xliff2js } from 'xliff/cjs';

/*
 * A script converting XLF files to JSON files
 */

const xliffToJs = promisify(xliff2js);
const dirName = path.join(__dirname, '..', 'src', 'assets', 'locale');

function translateFiles(fileNames: string[]) {
  return Promise.all(fileNames.filter((fileName) => fileName.includes('.xlf')).map(translateFile));
}

function translateFile(xlifFile: string) {
  const fileName = xlifFile.split('.')[0];
  return fs
    .readFile(path.join(dirName, `${fileName}.xlf`))
    .then((value) => value.toString())
    .then((value) => parseTranslationsForLocalize(value))
    .then((val) => fs.writeFile(path.join(dirName, `${fileName}.json`), JSON.stringify(val)));
}

async function parseTranslationsForLocalize(translations: string): Promise<Record<string, string>> {
  const parserResult = await xliffToJs(translations);

  const { ngi18n } = parserResult.resources;
  if (!ngi18n) {
    throw new Error('Expected ng18n resource to be available in xliff file');
  }

  return Object.entries(ngi18n).reduce<Record<string, string>>((result, [key, translation]) => {
    if (Array.isArray(translation.target)) {
      result[key] = reduceTranslation(translation.target);
    } else if (Array.isArray(translation.source)) {
      result[key] = reduceTranslation(translation.source);
    } else {
      result[key] = translation.target ?? translation.source;
    }
    return result;
  }, {});
}

function reduceTranslation(translation: SpanOrStandaloneOrString[]): string {
  return translation.reduce<string>((finalTranslation, translation) => {
    if (typeof translation === 'string') {
      return finalTranslation + translation;
    } else if ('Standalone' in translation) {
      return finalTranslation + '{$' + translation.Standalone.equiv + '}';
    }
    // Any nested HTML elements will be thrown in here, they are not needed as of now
    return finalTranslation;
  }, '');
}

fs.readdir(dirName).then((fileNames) => translateFiles(fileNames));
