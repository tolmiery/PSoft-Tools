import { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import lang from "../lib/dafnyLang";

export default function DafnyEditor() {
  const monaco = useMonaco();
  const dafny = lang();
  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: "dafny" });
      monaco.languages.setMonarchTokensProvider("dafny", {
        keywords: dafny.keywords,
        verifyKeywords: dafny.verifyKeywords,
        types: dafny.types,
        brackets: dafny.brackets,
        escapes: dafny.escapes,
        tokenizer: {
          root: [
            // identifiers
            [/array([2-9]\d*|1\d+)/, "type.keyword"],
            [
              /[a-zA-Z'_?\\][\w'?\\]*/,
              {
                cases: {
                  "@keywords": "keyword",
                  "@verifyKeywords": "constructor.identifier",
                  "@types": "type.keyword",
                  "@default": "identifier",
                },
              },
            ],
            [":=", "keyword"],

            // whitespace
            { include: "@whitespace" },

            [/[{}()[\]]/, "@brackets"],
            [/[;,]/, "delimiter"],

            // literals
            [/[0-9]+/, "number"],

            // strings
            [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
            [/"/, "string", "@string"],
          ],

          whitespace: [
            [/[ \t\r\n]+/, "white"],
            [/\/\*/, "comment", "@comment"],
            [/\/\/.*$/, "comment"],
          ],

          comment: [
            [/[^/*]+/, "comment"],
            [/\/\*/, "comment", "@push"], // nested comment
            ["\\*/", "comment", "@pop"],
            [/[/*]/, "comment"],
          ],

          string: [
            [/[^\\"]+/, "string"],
            [/@escapes/, "string.escape"],
            [/\\./, "string.escape.invalid"],
            [/"/, "string", "@pop"],
          ],
        },
      });

      // monaco.languages.registerCompletionItemProvider("dafny", {
      // });
    }
  }, [monaco]);

  return <Editor height="90vh" defaultLanguage="dafny" />;
}
