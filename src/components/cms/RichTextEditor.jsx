import React, { useRef, useEffect, useContext } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ThemeContext from '../../ThemeContext';

const RichTextEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);
    const { isDark } = useContext(ThemeContext);

    useEffect(() => {
        if (editorRef.current) {
            const editor = editorRef.current;
            editor.editing.view.change((writer) => {
                writer.setStyle(
                    "background-color",
                    isDark ? "#2d3748" : "#ffffff",
                    editor.editing.view.document.getRoot()
                );
                writer.setStyle(
                    "color",
                    isDark ? "#ffffff" : "#000000",
                    editor.editing.view.document.getRoot()
                );
            });
        }
    }, [isDark]);

    return (
        <CKEditor
            editor={ClassicEditor}
            data={value}
            onReady={(editor) => {
                editorRef.current = editor;
                editor.editing.view.change((writer) => {
                    writer.setStyle(
                        "background-color",
                        isDark ? "#2d3748" : "#ffffff",
                        editor.editing.view.document.getRoot()
                    );
                    writer.setStyle(
                        "color",
                        isDark ? "#ffffff" : "#000000",
                        editor.editing.view.document.getRoot()
                    );
                });
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
            config={{
                toolbar: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    'blockQuote',
                    '|',
                    'insertTable',
                    'mediaEmbed',
                    '|',
                    'undo',
                    'redo',
                ],
            }}
        />
    );
};

export default RichTextEditor;