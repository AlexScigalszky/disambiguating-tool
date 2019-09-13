import { Pipe, PipeTransform, Sanitizer, SecurityContext } from "@angular/core";

@Pipe({
  name: "boldWord"
})
export class BoldWordPipe implements PipeTransform {
  constructor(private sanitizer: Sanitizer) {}

  transform(sentence: string, word: string): any {
    if (!sentence || !word) return sentence;
    return this.sanitize(sentence.replace(word, `<b>${word}</b>`));
  }

  sanitize(str) {
    return str;
    // return this.sanitizer.sanitize(SecurityContext.HTML, str);
  }
}
