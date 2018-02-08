import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared';
import { EditorComponent } from './editor.component';
import { EditableEditorResolver } from './editable-editor-resolver.service';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    resolve: {
      article: EditableEditorResolver
    }
  }
]);

@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    editorRouting,
    FormsModule
  ],
  exports: [],
  providers: [
    EditableEditorResolver
  ],
})
export class EditorModule {}
