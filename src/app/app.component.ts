import {AfterViewChecked, AfterViewInit, Component} from '@angular/core';
import {Ngr2MarkdownService} from '../../projects/ngr2-markdown/src/lib/service/ngr2-markdown.service';
import {Tree} from '../../projects/ngr2-markdown/src/lib/core/tree/tree';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
  title = 'ngr2-markdown-example';
  exampleText1 = `## page类构造函数
\`\`\`java
public Page(int pageId, String pageTitle, String pageAuthor, String pageContent, Timestamp createTime, Timestamp lastModifiedTime) {
        this.pageId = pageId;
        this.pageTitle = pageTitle;
        this.pageAuthor = pageAuthor;
        this.pageContent = pageContent;
        this.createTime = createTime;
        this.lastModifiedTime = lastModifiedTime;
    }
\`\`\`
### test3
### test4
## Controller层
\`\`\`java
/**
     * 获取指定页面完整信息
     * @author Ce
     * @date 2018/4/25 17:02
     * @param [pageId]
     * @return com.alibaba.fastjson.JSONObject
     */
    public Page pageInfo (int pageId) {

        Object[] params = new Object[1];
        params[0] = pageId;
        List list = queryRepository.executeQuery("select new Page(pageId, pageTitle, pageAuthor, pageContent, createTime, lastModifiedTime) from Page where pageId=?0", params);

        if (list.size() > 1) {
            try {
                throw new Exception("pageId对应了多个page");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return (Page) list.get(0);
    }
\`\`\`
### test5
可以看到在Page类的构造函数中有Timestamp类型的两个参数\`createTime\`和\`lastModifiedTime\`而导致爆出以下错误的原因是hibernate没有找到对应的构造函数.
\`\`\`
cause=org.hibernate.PropertyNotFoundException: no appropriate constructor in class: cn.freedoe.entity.Page
\`\`\`
所以应该是hibernate在mysql的timestamp类型和java的Timestamp类型转换的问题.
但是通过Criteria添加条件,是可以成功执行查询的,所以问题范围缩小到HQL语句的DTO查询对Timestamp类型的转换识别
`;
  exampleText2 = `## Controller层
\`\`\`java
/**
     * 获取指定页面完整信息
     * @author Ce
     * @date 2018/4/25 17:02
     * @param [pageId]
     * @return com.alibaba.fastjson.JSONObject
     */
    public Page pageInfo (int pageId) {

        Object[] params = new Object[1];
        params[0] = pageId;
        List list = queryRepository.executeQuery("select new Page(pageId, pageTitle, pageAuthor, pageContent, createTime, lastModifiedTime) from Page where pageId=?0", params);

        if (list.size() > 1) {
            try {
                throw new Exception("pageId对应了多个page");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return (Page) list.get(0);
    }
\`\`\``;
  content = null;

  constructor(
    private markdownService: Ngr2MarkdownService
  ) {
    markdownService.reinitialization(this.exampleText1);
  }

  ngAfterViewInit(): void {
  }

  ngAfterViewChecked(): void {
  }

  changeContent() {
    if (this.content === null || this.content === this.exampleText1) {
      this.content = this.exampleText2;
    } else {
      this.content = this.exampleText1;
    }
  }

  changeContentToNull() {
    this.content = null;
  }
}
