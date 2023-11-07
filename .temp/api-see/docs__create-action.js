export default {
      tile: `创建请求方法`,
      docs: `<h1>创建请求方法</h1>
<div class="card"><h3 id="%E4%BB%8B%E7%BB%8D"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>介绍</h3>
<p>在创建ts类型的同时创建请求方法，请求方法和类型不能在同一层级的文件下</p>
</div><div class="card"><h3 id="%E9%85%8D%E7%BD%AE"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>配置</h3>
<table>
<thead>
<tr>
<th>字段</th>
<th>描述</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>dirPath</td>
<td>相对ts类型文件的路径,建议使用默认</td>
<td><em>string</em></td>
<td>&quot;..actions&quot;</td>
</tr>
<tr>
<td>createDefaultModel</td>
<td>定义请求方法的结构</td>
<td><em>function</em></td>
<td><code>createDefaultModel</code></td>
</tr>
</tbody>
</table>
<p><code>createDefaultModel</code>回调函数的参数：</p>
<ul>
<li>fileName：对应ts请求类型的文件名称</li>
<li>data对象的key是请求路径拼接的</li>
<li>data[key].hasRequestQuery判断当前url中是否存在query</li>
<li>data[key].hasResponseData判断当前请求是否存在<code>data</code>字段</li>
<li>data[key].requestNull请求字段是否可为空</li>
<li>data[key].url 请求的路径</li>
<li>data[key].description 请求的描述</li>
<li>data[key].method 请求方法</li>
<li>data[key].serviceName 请求的服务名称， 可以拼接到url之前, 通过ts类型代码注释或者swagger配置里面得到</li>
</ul>
<div class="code-box-max">
<div class="copy-code-btn"></div>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Iconfig</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;api-see&#x27;</span>

<span class="hljs-keyword">const</span> <span class="hljs-attr">config</span>: <span class="hljs-title class_">Iconfig</span> = {
  <span class="hljs-attr">action</span>: {
    createDefaultModel ({
      data,
      fileName,
    }) {
      <span class="hljs-keyword">const</span> <span class="hljs-attr">IMPORT_TYPES</span>: <span class="hljs-built_in">string</span>[] = []
      <span class="hljs-keyword">let</span> <span class="hljs-variable constant_">SERVICES</span> = <span class="hljs-string">&#x27;&#x27;</span>
      <span class="hljs-keyword">let</span> code = <span class="hljs-string">::::_QA
    /* eslint-disable space-before-function-paren */
    import { zApi } from &#x27;@dian/app-utils&#x27;
    IMPORT_TYPES
    
    SERVICES
      ::::_QA</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> data) {
        <span class="hljs-keyword">const</span> item = data[key]

        <span class="hljs-keyword">if</span> (key.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;Record&lt;string&#x27;</span>) || !item.<span class="hljs-property">url</span> || !item.<span class="hljs-property">method</span>) <span class="hljs-keyword">continue</span>
        <span class="hljs-variable constant_">IMPORT_TYPES</span>.<span class="hljs-title function_">push</span>(key)
        <span class="hljs-keyword">const</span> method = item.<span class="hljs-property">method</span>
        <span class="hljs-keyword">const</span> description = item.<span class="hljs-property">description</span> || <span class="hljs-string">&#x27;--&#x27;</span>
        <span class="hljs-keyword">const</span> url = <span class="hljs-string">::::_QA/<span class="hljs-subst">::::_ABitem.serviceName}</span><span class="hljs-subst">::::_ABitem.url}</span>::::_QA</span>
        <span class="hljs-keyword">let</span> responseTT = <span class="hljs-string">&#x27;&#x27;</span>
        <span class="hljs-keyword">if</span> (item?.<span class="hljs-property">hasResponseData</span>) {
          responseTT = <span class="hljs-string">::::_QA&lt;<span class="hljs-subst">::::_ABkey}</span>[&#x27;response&#x27;][&#x27;data&#x27;]&gt;::::_QA</span>
        }
        <span class="hljs-keyword">let</span> ifQueryReplace = <span class="hljs-string">&#x27;&#x27;</span>
        <span class="hljs-keyword">let</span> queryParams = <span class="hljs-string">&#x27;&#x27;</span>
        <span class="hljs-keyword">if</span> (item.<span class="hljs-property">hasRequestQuery</span>) {
          ifQueryReplace = <span class="hljs-string">::::_QA.replace(&quot;<span class="hljs-subst">::::_ABitem.queryKey}</span>&quot;, query)::::_QA</span>
          queryParams = <span class="hljs-string">&#x27;,query:string&#x27;</span>
        }

        <span class="hljs-variable constant_">SERVICES</span> += <span class="hljs-string">::::_QA/** <span class="hljs-subst">::::_ABdescription}</span> */ \n::::_QA</span>
        <span class="hljs-variable constant_">SERVICES</span> += <span class="hljs-string">::::_QAexport async function <span class="hljs-subst">::::_ABkey}</span>Service (params: <span class="hljs-subst">::::_ABkey}</span>[&#x27;request&#x27;] <span class="hljs-subst">::::_ABqueryParams}</span>) {
          const data = await zApi.<span class="hljs-subst">::::_ABmethod}</span><span class="hljs-subst">::::_ABresponseTT}</span>(&#x27;<span class="hljs-subst">::::_ABurl}</span>&#x27;<span class="hljs-subst">::::_ABifQueryReplace}</span>, <span class="hljs-subst">::::_ABitem.method === <span class="hljs-string">&#x27;get&#x27;</span> ? <span class="hljs-string">&#x27;{ params }&#x27;</span> : <span class="hljs-string">&#x27;params&#x27;</span>}</span> )
          return data
        }\n\n::::_QA</span>
      }

      code = code.<span class="hljs-title function_">replace</span>(
        <span class="hljs-string">&#x27;IMPORT_TYPES&#x27;</span>,
        <span class="hljs-string">::::_QAimport type { <span class="hljs-subst">::::_ABIMPORT_TYPES.join(
          <span class="hljs-string">&#x27;,&#x27;</span>,
        )}</span> } from &#x27;../types/<span class="hljs-subst">::::_ABfileName}</span>&#x27;::::_QA</span>,
      )
      code = code.<span class="hljs-title function_">replace</span>(<span class="hljs-string">&#x27;SERVICES&#x27;</span>, <span class="hljs-variable constant_">SERVICES</span>)

      <span class="hljs-keyword">return</span> code
    },
  },
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> config
</code></pre>
</div>
</div>`,
      h3Ids: `介绍:::配置`,
      codePath: []
    }