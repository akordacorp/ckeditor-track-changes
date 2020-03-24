import React from 'react';
import './App.css';
import CKEditor from 'ckeditor4-react';

const App: React.FC = () => {
  return (
    <div className="App">
      <CKEditor
        config={{
          extraPlugins: 'liter',
        }}
        data="<p>hello world</p>"
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
