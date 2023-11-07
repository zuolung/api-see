export default {
      tile: `根据swagger生成代码`,
      docs: `<h1>根据swagger生成代码</h1>
<div class="card"><h3 id="%E4%BB%8B%E7%BB%8D"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>介绍</h3>
<p>根据swagger的json可以生成ts类型代码和请求代码, service-name,只转换配置项里面的某个swagger服务</p>
<div class="code-box-max">
<div class="copy-code-btn"></div>
<pre><code class="language-bash">api-see swagger
api-see swagger --service-name xx
</code></pre>
</div>
</div><div class="card"><h3 id="%E9%85%8D%E7%BD%AE"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>配置</h3>
<ul>
<li>dir: 请求ts类型和请求方法最外层的文件路径</li>
<li>service： 请求swagger服务名称、swaggerJSON路径url、modules需要的模块，不传则转换所有</li>
</ul>
<div class="code-box-max">
<div class="copy-code-btn"></div>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Iconfig</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;api-see&#x27;</span>

<span class="hljs-keyword">const</span> <span class="hljs-attr">config</span>: <span class="hljs-title class_">Iconfig</span> = {
  <span class="hljs-attr">swagger</span>: {
    <span class="hljs-attr">dir</span>: <span class="hljs-string">&#x27;src/api&#x27;</span>,
    <span class="hljs-attr">services</span>: [
      {
        <span class="hljs-attr">serviceName</span>: <span class="hljs-string">&#x27;aa&#x27;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;http://xxxxxxx&#x27;</span>,
        <span class="hljs-attr">modules</span>: [<span class="hljs-string">&#x27;xxxx&#x27;</span>],
      },
      {
        <span class="hljs-attr">serviceName</span>: <span class="hljs-string">&#x27;bb&#x27;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;http://xxxxxxx&#x27;</span>,
      },
    ]
  }
}
</code></pre>
</div>
<p>生成文件的目录结构如下</p>
<div class="code-box-max">
<div class="copy-code-btn"></div>
<pre><code class="language-markdown">src
├── api
│ |── aa
| | |── actions
| | └── types
| └── bb
|   |── actions
|   └── types
</code></pre>
</div>
<blockquote>
<p>actions为请求方法，type为请求类型</p>
</blockquote>
</div><div class="card"><h3 id="%E8%AF%B7%E6%B1%82%E7%B1%BB%E5%9E%8B%E6%A0%87%E5%87%86"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>请求类型标准</h3>
<ul>
<li>请求字段的名称由url驼峰拼接而成</li>
<li><code>query</code>格式的请求在请求方法拼接的配置函数中有<code>requestNull</code>标识</li>
<li><code>swagger-base</code>文件为公共基础类型， 基类名称来至swaggerJSON中<code>defination</code>的<code>key</code>,中文会转拼音，会出现长度比较长的情况</li>
</ul>
<div class="code-box-max">
<div class="copy-code-btn"></div>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">BizResult</span>_int } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./swagger-base&#x27;</span>
<span class="hljs-comment">/**
 * deviceGroupFixIsCoreData
 * <span class="hljs-doctag">@url</span> /device/group/deviceGroupFixIsCoreData/{groupId}
 * <span class="hljs-doctag">@method</span> <span class="hljs-variable">post</span>
 * <span class="hljs-doctag">@introduce</span> --
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">DeviceGroupDeviceGroupFixIsCoreDataGroupId</span> = {
  <span class="hljs-attr">request</span>: <span class="hljs-literal">undefined</span>

  <span class="hljs-attr">response</span>: <span class="hljs-title class_">BizResult</span>_int
}
</code></pre>
</div>
</div><div class="card"><h3 id="restfullAPI%E6%A0%87%E5%87%86"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>restfullAPI标准</h3>
<p>针对请求参数的处理</p>
<ul>
<li>
<p><code>GET</code>方法：GET方法通常将参数放在URL的查询参数中。查询参数是以“?”符号分隔URL和参数的，多个参数之间使用“&amp;”符号分隔。
例如：http://example.com/api/resource?param1=value1&amp;param2=value2。GET方法的参数通常是可选的，用于过滤结果或指定条件。</p>
</li>
<li>
<p><code>PUT</code>方法：PUT方法将参数放在请求的主体中，使用JSON或其他格式进行序列化。请求的头部需要设置正确的Content-Type，如application/json。在PUT请求中，参数是必需的，因为请求的路径通常指定了要更新的资源，而参数则提供更新的具体数据。</p>
</li>
<li>
<p><code>POST</code>方法：POST方法与PUT方法类似，将参数放在请求的主体中，使用JSON或其他格式进行序列化。与PUT方法不同的是，POST请求通常用于创建新的资源，因此请求的路径通常指定了要创建的资源的父资源。与PUT方法相同，POST请求的参数也是必需的。</p>
</li>
<li>
<p><code>DELETE</code>方法：DELETE方法通常不需要传递参数，因为它主要用于删除指定的资源。如果要传递参数，可以将其放在URL的查询参数中，但这不是常见的做法。在DELETE请求中，路径通常指定要删除的资源的唯一标识符。</p>
</li>
</ul>
<p>不符合上述规则的请求参数将被省略，其他请求方法默认从<code>body</code>里面取</p>
<ul>
<li>一个url对应多个请求的时候，只会解析第一个请求，如果有url对应多个请求,生成的请求方法达不到预期,请自行创建特殊请求和请求方法的映射关系如下，在<a href="/#/create-action">action.createDefaultModel</a>组装请求方法的时候过滤下</li>
</ul>
<div class="code-box-max">
<div class="copy-code-btn"></div>
<pre><code class="language-ts"><span class="hljs-comment">// 如遇到 &#x27;a/b/c&#x27;这个请求有多种请求方法，可以在createDefaultModel中过滤出来，选择生成多个，或者生成需要的方法的请求</span>
<span class="hljs-keyword">const</span> specialUrl = {
  <span class="hljs-string">&#x27;a/b/c&#x27;</span>: <span class="hljs-string">&#x27;post&#x27;</span>
}
</code></pre>
</div>
</div><div class="card"><h3 id="%E7%94%9F%E6%88%90%E4%BB%A3%E7%A0%81%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>生成代码的格式化</h3>
<p>项目根目录配置<code>.prettierrc</code>文件， 默认的配置如下</p>
<div class="code-box-max">
<div class="copy-code-btn"></div>
<pre><code class="language-ts">{
  <span class="hljs-attr">semi</span>: <span class="hljs-literal">false</span>
  <span class="hljs-attr">singleQuote</span>: <span class="hljs-literal">true</span>
  <span class="hljs-attr">trailingComma</span>: <span class="hljs-string">&#x27;all&#x27;</span>
}
</code></pre>
</div>
</div>`,
      h3Ids: `介绍:::配置:::请求类型标准:::restfullAPI标准:::生成代码的格式化`,
      codePath: []
    }