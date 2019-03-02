# Ngr2Markdown

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Install
```text
npm install --save ngr2-markdown
```
## Usage
在模块中导入`Ngr2MarkdownModule`
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
在HTML模板中使用
```angular2html
<nb-ngr2-markdown
    [options]="{TOC: true, direction: 'left', bodyClassName: 'markdown-body', height: 'calc(100vh - 40px)', themeColor: '#3f51a5'}"
    [markdown]="content"
    class="markdown"
  ></nb-ngr2-markdown>
```
## 参数说明
### options
| name | value | default | description |
| --- | --- | --- | --- |
| TOC | `true`/`false`: boolean | `true` | 打开/关闭目录 |
| direction | `left`/`right`: string | `left` | 目录在内容左边/右边 |
| bodyClassName | string | `markdown-body` | 用于给内容添加样式 |
| height | string | `800px` | 内容高度, 可以使用`800px/vh/cm`等mdn标准单位以及使用calc()计算 |
| themeColor | string | `#3f51a5` | 目录中高亮标题的颜色 |
### markdown
| name | value | description |
| --- | --- | --- |
| markdown | string | markdown原始文本 |
