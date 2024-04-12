import { EditorProps, useMonaco } from "@monaco-editor/react";
import { useEffect, useMemo } from "react";
import { Editor } from "@monaco-editor/react";
import lang from "../lib/dafnyLang";

export default function DafnyEditor({
  EditorProps,
}: {
  EditorProps: EditorProps;
}) {
  const monaco = useMonaco();
  const dafny = useMemo(() => lang(), []);
  const language = dafny.langDef;
  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: "dafny" });
      monaco.languages.setMonarchTokensProvider("dafny", {
        keywords: language.keywords,
        verifyKeywords: language.verifyKeywords,
        types: language.types,
        brackets: language.brackets,
        escapes: language.escapes,
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

      monaco.languages.registerCompletionItemProvider("dafny", {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          return { suggestions: dafny.suggestionsWithRange(range) };
        },
      });
    }
  }, [monaco]);

  return <Editor {...EditorProps} />;
}
