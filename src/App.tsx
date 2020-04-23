import React from 'react';
import './App.css';
import CKEditor from 'ckeditor4-react';

const App: React.FC = () => {
  return (
    <div className="App">
      <CKEditor
        config={{
          allowedContent: true,
          extraPlugins: 'liter',
          lite: {
            userId: 191,
            userName: 'Matt Meiske',
          },
        }}
        data={`<div>
        <p>
        <ins data-id="1" class="ice-ins ice-cts-2"><span>The quick <b>brown</b> fox <i>jumps</i> over the lazy dog</span></ins>
        </p>
        <p>
          Text before ins <ins data-id="1" class="ice-ins ice-cts-2"><span data-last-name="meiske">The comment starts here→<span data-w-id="1" data-track-changes-ignore="true" cke-editable="false" unselectable="true" contenteditable="false" start="true" class="comment-marker comment-start"></span><span data-c-id="s1 " class="marker-comment" removable="true">I am a comment</span><img data-c-id="i1" class="marker-image" src="/assets/src/media/img/font-comment.png?440e7fee" data-track-changes-ignore="true" data-cke-real-element-type="annotation" cke-editable="false" contenteditable="false"><span data-w-id="1" data-track-changes-ignore="true" cke-editable="false" contenteditable="false" end="true" class="comment-end comment-marker"></span>←and ends there.</span></ins> Text after ins
        </p>
      <div>`}
        onBeforeLoad={(CKEDITOR: any) => {
          CKEDITOR.disableAutoInline = true;
          CKEDITOR.dtd.$removeEmpty.ins = 0;
          CKEDITOR.dtd.$removeEmpty.del = 0;
          CKEDITOR.dtd.$removeEmpty.div = 0;
          CKEDITOR.dtd.$removeEmpty.span = 0;
          CKEDITOR.dtd.$removeEmpty.li = 0;
          CKEDITOR.dtd.$removeEmpty.ol = 0;
          CKEDITOR.dtd.$removeEmpty.ul = 0;
          CKEDITOR.dtd.$removeEmpty.p = 0;
        }}
      />
    </div>
  );
};

export default App;
