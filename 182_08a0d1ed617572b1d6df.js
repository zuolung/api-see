"use strict";(self.webpackChunkapi_see=self.webpackChunkapi_see||[]).push([[182],{5182:(s,a,n)=>{n.r(a),n.d(a,{default:()=>e});const e={tile:"api-seevscode插件",docs:'<h1>api-see vscode 插件</h1>\n<p>将指定的 swagger 模块或者接口，转换为 ts 文件和请求方法文件。<a href="https://github.com/zuolung/api-see">git</a></p>\n<div class="card"><h3 id="%E5%8A%9F%E8%83%BD"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>功能</h3>\n<p>右键菜单：</p>\n<ul>\n<li>swagger【接口】TS化</li>\n<li>swagger【模块】TS化</li>\n<li>swagger【请求】更新</li>\n<li>swagger【基类】TS更新</li>\n</ul>\n<ol>\n<li>选择 swagger 服务名称</li>\n<li>选择 swagger 接口/模块</li>\n<li>生成请求方法</li>\n<li>更新当前ts类型文件引用的swagger基类</li>\n</ol>\n<blockquote>\n<p>服务端swagger接口更新的时候，请使用<code>swagger【基类】TS更新</code>更新, 接口删除的时请使用<code>swagger【请求】更新</code>更新请求方法</p>\n</blockquote>\n<blockquote>\n<p>文件生成中的时候，请勿保存当前文件</p>\n</blockquote>\n<p>文件结构如下：</p>\n<div class="code-box-max">\n<div class="copy-code-btn"></div>\n<pre><code class="language-md">xxx/actions\n├── goods.ts            // 右键菜单点击后 swagger 生成的请求类型\n└── goods-action.ts     // 同时生成对应的请求方法\n\nsrc\n├── swagger-base        // swagger基累会被保存到<span class="hljs-code">::::_QAsrc/swagger-base::::_QA</span>下面\n└── xxxserviceName.ts   // swagger xx 服务公共类型\n</code></pre>\n</div>\n<blockquote>\n<p>项目根目录必须创建<code>src</code>文件，便于<code>swagger-base</code>文件的创建</p>\n</blockquote>\n</div><div class="card"><h3 id="%E8%A6%81%E6%B1%82"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>要求</h3>\n<ol>\n<li>请求类型的文件的头部需要添加 “@swagger”的注释</li>\n</ol>\n<div class="code-box-max">\n<div class="copy-code-btn"></div>\n<pre><code class="language-ts"><span class="hljs-comment">/** <span class="hljs-doctag">@swagger</span> */</span>\n</code></pre>\n</div>\n<ol start="2">\n<li>根目录配置 api.config.js 文件</li>\n</ol>\n<table>\n<thead>\n<tr>\n<th>名称</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>swaggers</td>\n<td>Swagger API 列表</td>\n<td><code>Reord&lt;string, string&gt;</code> | <a href="#AsyncGetSwagger">AsyncGetSwagger</a></td>\n<td>{}</td>\n</tr>\n<tr>\n<td>makeService</td>\n<td>拼装请求方法</td>\n<td><a href="#MakeService">MakeService</a></td>\n<td><a href="#DetaultMakeService">DetaultMakeService</a></td>\n</tr>\n<tr>\n<td>serviceNames</td>\n<td>所有服务的列表, swaggers使用<code>AsyncGetSwagger</code>时必须传入</td>\n<td><code>string[]</code></td>\n<td>[]</td>\n</tr>\n</tbody>\n</table>\n</div><div class="card"><h3 id="AsyncGetSwagger"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>AsyncGetSwagger</h3>\n<p><code>swaggers</code> 项配置支持传入异步函数获取swagger应用地址， 异步方式下还需要配置<code>serviceNames</code></p>\n<div class="code-box-max">\n<div class="copy-code-btn"></div>\n<pre><code class="language-tsx"><span class="hljs-comment">/**\n * 异步获取\n * <span class="hljs-doctag">@param</span>1         某个服务的名称\n * <span class="hljs-doctag">@param</span>2 {{\n *  fetchData,    含异常机制处理的node-fetch\n *  showError   \tvsCode错误 提示 传入字符串\n * }}\n * <span class="hljs-doctag">@returns</span>  swaggers如{ serviceNamexx: &quot;http://xxxxxxxxx:8080/v2/api-docs?group=xxx&quot;}\n */</span>\n<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getSwaggers</span>(<span class="hljs-params">serviceName, { fetchData, showError }</span>) {...}\n</code></pre>\n</div>\n</div><div class="card"><h3 id="MakeService"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>MakeService</h3>\n<div class="code-box-max">\n<div class="copy-code-btn"></div>\n<pre><code class="language-tsx"><span class="hljs-comment">/**\n * 请求方法拼装\n * <span class="hljs-doctag">@param</span>2 {{\n *  fileNameOrigin,      引用类型的文件名称\n *  def                  对引用请求TS类型描述的数组\n * }}\n * <span class="hljs-doctag">@returns</span>  string    codeString\n */</span>\n<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">makeService</span>(<span class="hljs-params">{ def, fileNameOrigin }</span>) {\n    <span class="hljs-comment">// def 的数组项</span>\n    <span class="hljs-comment">// {</span>\n    <span class="hljs-comment">//   description: &#x27;接口描述&#x27;,</span>\n    <span class="hljs-comment">//   introduce: &#x27;接口介绍&#x27;,</span>\n    <span class="hljs-comment">//   method: &#x27;get&#x27;,</span>\n    <span class="hljs-comment">//   serviceName: &#x27;xxx服务&#x27;,</span>\n    <span class="hljs-comment">//   properties: {</span>\n    <span class="hljs-comment">//     response: {</span>\n    <span class="hljs-comment">//       type: &#x27;string&#x27; | &#x27;object&#x27; | &#x27;boolean&#x27; ......,</span>\n    <span class="hljs-comment">//       data: &#x27;具体数据，根据type类型的结构&#x27;</span>\n    <span class="hljs-comment">//     },</span>\n    <span class="hljs-comment">//     request: {</span>\n    <span class="hljs-comment">//       type: &#x27;string&#x27; | &#x27;object&#x27; | &#x27;boolean&#x27; ......,</span>\n    <span class="hljs-comment">//       data: &#x27;具体数据，根据type类型的结构&#x27;</span>\n    <span class="hljs-comment">//     },</span>\n    <span class="hljs-comment">//   },</span>\n    <span class="hljs-comment">// }</span>\n}\n</code></pre>\n</div>\n</div><div class="card"><h3 id="DetaultMakeService"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>DetaultMakeService</h3>\n<p>默认拼装请求的函数</p>\n<div class="code-box-max">\n<div class="copy-code-btn"></div>\n<pre><code class="language-js"><span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {\n  <span class="hljs-attr">markeService</span>: <span class="hljs-keyword">function</span> (<span class="hljs-params">{ def, fileNameOrigin }</span>) {\n    <span class="hljs-keyword">let</span> <span class="hljs-variable constant_">IMPORT_TYPES</span> = [];\n    <span class="hljs-keyword">let</span> <span class="hljs-variable constant_">SERVICES</span> = <span class="hljs-string">&quot;&quot;</span>;\n    <span class="hljs-keyword">let</span> code = <span class="hljs-string">::::_QA\n  import { zApi } from &#x27;@dian/app-utils&#x27;\n  IMPORT_TYPES\n  \n  SERVICES\n    ::::_QA</span>;\n    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> def) {\n      <span class="hljs-keyword">const</span> item = def[key];\n      <span class="hljs-comment">// @ts-ignore</span>\n      <span class="hljs-keyword">if</span> (key.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&quot;Record&lt;string&quot;</span>) || !item.<span class="hljs-property">url</span> || !item.<span class="hljs-property">method</span>) <span class="hljs-keyword">continue</span>;\n      <span class="hljs-variable constant_">IMPORT_TYPES</span>.<span class="hljs-title function_">push</span>(key);\n      <span class="hljs-comment">// @ts-ignore</span>\n      <span class="hljs-keyword">const</span> method = item.<span class="hljs-property">method</span>;\n      <span class="hljs-comment">// @ts-ignore</span>\n      <span class="hljs-keyword">const</span> description = item.<span class="hljs-property">description</span> || <span class="hljs-string">&quot;--&quot;</span>;\n      <span class="hljs-comment">// @ts-ignore</span>\n      <span class="hljs-keyword">const</span> url = <span class="hljs-string">::::_QA/<span class="hljs-subst">::::_ABitem.serviceName}</span><span class="hljs-subst">::::_ABitem.url}</span>::::_QA</span>;\n      <span class="hljs-keyword">let</span> responseTT = <span class="hljs-string">&quot;&quot;</span>;\n      <span class="hljs-keyword">if</span> (\n        item?.<span class="hljs-property">properties</span>?.<span class="hljs-property">response</span>?.<span class="hljs-property">type</span> === <span class="hljs-string">&quot;object&quot;</span> &amp;&amp;\n        item?.<span class="hljs-property">properties</span>?.<span class="hljs-property">response</span>?.<span class="hljs-property">properties</span>?.<span class="hljs-property">data</span>\n      ) {\n        responseTT = <span class="hljs-string">::::_QA&lt;<span class="hljs-subst">::::_ABkey}</span>[&#x27;response&#x27;][&#x27;data&#x27;]&gt;::::_QA</span>;\n      }\n\n      <span class="hljs-variable constant_">SERVICES</span> += <span class="hljs-string">::::_QA/** <span class="hljs-subst">::::_ABdescription}</span> */ \n::::_QA</span>;\n      <span class="hljs-variable constant_">SERVICES</span> += <span class="hljs-string">::::_QAexport async function <span class="hljs-subst">::::_ABkey}</span>Service (params: <span class="hljs-subst">::::_ABkey}</span>[&#x27;request&#x27;]) {\n        const data = await zApi.<span class="hljs-subst">::::_ABmethod}</span><span class="hljs-subst">::::_ABresponseTT}</span>(&#x27;<span class="hljs-subst">::::_ABurl}</span>&#x27;, { params })\n        return data\n      }\n\n::::_QA</span>;\n    }\n\n    code = code.<span class="hljs-title function_">replace</span>(\n      <span class="hljs-string">&quot;IMPORT_TYPES&quot;</span>,\n      <span class="hljs-string">::::_QAimport type { <span class="hljs-subst">::::_ABIMPORT_TYPES.join(<span class="hljs-string">&quot;,&quot;</span>)}</span> } from &#x27;./<span class="hljs-subst">::::_ABfileNameOrigin}</span>&#x27;::::_QA</span>\n    );\n    code = code.<span class="hljs-title function_">replace</span>(<span class="hljs-string">&quot;SERVICES&quot;</span>, <span class="hljs-variable constant_">SERVICES</span>);\n\n    <span class="hljs-keyword">return</span> code;\n  },\n};\n</code></pre>\n</div>\n<p>生成 ts 的结构如下：</p>\n<div class="code-box-max">\n<div class="copy-code-btn"></div>\n<pre><code class="language-ts"><span class="hljs-comment">/**\n * shopList\n * <span class="hljs-doctag">@url</span> /test/shopList\n * <span class="hljs-doctag">@method</span> <span class="hljs-variable">get</span>\n * <span class="hljs-doctag">@introduce</span> --\n * <span class="hljs-doctag">@serciceName</span> <span class="hljs-variable">xxxx</span>\n */</span>\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">ItestTestShopList</span> = {\n  <span class="hljs-attr">request</span>: {\n    <span class="hljs-comment">/**\n     * <span class="hljs-doctag">@description</span> <span class="hljs-variable">contractId</span>\n     */</span>\n    <span class="hljs-attr">contractId</span>: <span class="hljs-built_in">number</span>;\n  };\n  <span class="hljs-attr">response</span>: <span class="hljs-built_in">number</span>;\n};\n</code></pre>\n</div>\n</div>',h3Ids:"功能:::要求:::AsyncGetSwagger:::MakeService:::DetaultMakeService",codePath:[]}}}]);