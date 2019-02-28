# Ngr2Markdown

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Install
```text
npm install --save ngr2-markdown
```
## Usage
```diff
+ import { Ngr2MarkdownModule } from 'ngr2-markdown';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
+   Ngr2MarkdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```
