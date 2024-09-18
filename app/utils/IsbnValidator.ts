import isbn from 'isbn3';

export class IsbnValidator {
  static isValid(isbnString: string): boolean {
    const isbnObject = isbn.parse(isbnString);
    return !!isbnObject && (isbnObject.isIsbn10 || isbnObject.isIsbn13);
  }
}
