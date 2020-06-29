import React from 'react';
import './App.css';
import CKEditor from 'ckeditor4-react';

let userName = 'Veruca Salt';

const App: React.FC = () => {
  return (
    <div className="App">
      <CKEditor
        config={{
          allowedContent: true,
          extraPlugins: 'liter',
          lite: {
            userId: userName,
            userName,
            debug: { log: true },
          },
        }}
        data={`<div>
        <p>
          Leroy Jenkins: <ins data-id="1" class="ice-ins ice-cts-0" data-username="Leroy Jenkins" data-userid="Leroy Jenkins"><span>The quick <b>brown</b> fox <i>jumps</i> over the lazy dog</span></ins>
        </p>

        <p>
          Augustus Gloop: <ins data-id="2" class="ice-ins ice-cts-1" data-username="Augustus Gloop" data-userid="Augustus Gloop"><span>The quick <b>brown</b> fox <i>jumps</i> over the lazy dog</span></ins>
        </p>
        <p>
          Augustus Gloop: <del data-id="8" class="ice-del ice-cts-1" data-username="Augustus Gloop" data-userid="Augustus Gloop"><span>The quick <b>brown</b> fox <i>jumps</i> over the lazy dog</span></del>
        </p>
        <p>
          Violet Beauregarde: <ins data-id="3" class="ice-ins ice-cts-2" data-username="Violet Beauregarde" data-userid="Violet Beauregarde"><span>The quick <b>brown</b> fox <i>jumps</i> over the lazy dog</span></ins>
        </p>
        <p>
        Violet Beauregarde: <del data-id="6" class="ice-del ice-cts-2" data-username="Violet Beauregarde" data-userid="Violet Beauregarde"><span>The quick <b>brown</b> fox <i>jumps</i> over the lazy dog</span></del>
      </p>
        <p>
          Veruca Salt: <ins data-id="4" class="ice-ins ice-cts-3" data-username="Veruca Salt" data-userid="Veruca Salt"><span>The quick <b>brown</b> fox <i>jumps</i> over the lazy dog</span></ins>
        </p>
        <p>
          Mike Teevee: <ins data-id="9" class="ice-ins ice-cts-4" data-username="Mike Teevee" data-userid="Mike Teevee"><span>The quick <b>brown</b> fox <i>jumps</i> over the lazy dog</span></ins>
        </p>

        <p>
          Veruca Salt: <del data-id="7" class="ice-del ice-cts-3" data-username="Veruca Salt" data-userid="Veruca Salt"><span>The quick <b>brown</b> fox <i>jumps</i> over the lazy dog</span></del>
        </p>
        <p>
          Mike Teevee: <del data-id="10" class="ice-del ice-cts-4" data-username="Mike Teevee" data-userid="Mike Teevee"><span>The quick <b>brown</b> fox <i>jumps</i> over the lazy dog</span></del>
        </p>
        <p>
          Leroy Jenkins: <del data-id="5" class="ice-del ice-cts-0" data-username="Leroy Jenkins" data-userid="Leroy Jenkins"><span>The quick <b>brown</b> fox <i>jumps</i> over the lazy dog</span></del>
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
        onInstanceReady={(evt: any) => {
          evt.editor.on('lite:init', (evt: any) => {
            // const lite = evt.data.lite;
            // lite.startNewSession();
          });

          evt.editor.on('lite:change', (evt: any) => {
            console.log('change', evt.data);
          });
        }}
      />
    </div>
  );
};

export default App;
