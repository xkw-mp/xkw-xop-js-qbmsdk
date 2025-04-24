# 为什么要使用SDK？

学科网开放平台（下文简称XOP）输出的试题为HTML格式，试题的内容由三个独立的字段构成，分别是题干、答案和解析。这三个内容字段的内部都是高度结构化，可以识别出`选项组`、`选项`、`填空`、`小题（问）`等结构型元素。题干中小题、作答交互项的数量与答案中的小题、答案值是一一对应的。



试题结构分为两类：简单题和复合题，其中简单题不包括小题，复合题由公共语料和多个小题构成。

简单题结构图1 所示：

![](https://img.xkw.com/dksih/xopqbm/resource/image/ques_desc_01.png "")



复合题结构如图2 所示：

![](https://img.xkw.com/dksih/xopqbm/resource/image/ques_desc_02.png "")

XOP的试题内部结构通过html元素层级和元素的class属性实现。详情请参看《试题HTML渲染说明》中”基本结构”一节。在学生”在线作答”、”机器批改”、”定制渲染”等场景，应用方需要对试题内部结构做更细颗粒度解构，应用方可以自己开发解构程序，但是成本较高。

由此，学科网开放平台推出了JavaScript版本的题库软件开发工具包（SDK），旨在为JavaScript开发者提供一系列在前端可以对试题结构进行深度解构的能力，提升开发效率，以更好地满足试题在线作答和机器批改的需求。

GitHub地址：[https://github.com/xkw-mp/xkw-xop-js-qbmsdk](https://github.com/xkw-mp/xkw-xop-js-qbmsdk)



# SDK介绍

## 下载SDK

1). 点击[下载JS-SDK](https://static.zxxk.com/baseapp/xop/xkw-xop-js-qbmsdk-1.0.3.zip)；

2). 复制到工程文件夹中，即可使用；



注意：支持IE9+，Chrome内核等，上线前可以针对浏览器兼容性做测试。



SDK中的文件列表如下如下：

| README.md            | 使用说明     |
| -------------------- | -------- |
| xkw-xop-qbmsdk.js    | js sdk文件 |
| xopqbm-sdk-demo.html | 可视化DEMO  |



## 接口能力

| 接口能力名称 | 能力简述                                                     |
| ------------ | ------------------------------------------------------------ |
| 题干拆分     | 将题干根据简单题和复合题拆分为面向对象的层级结构，可以识别出题干、选项、小题（问）、填空数量等。 |
| 答案拆分     | 将答案拆分为小题或者简单题答案。                             |
| 解析拆分     | 将解析拆分为小题解析、分析、点睛等解析片段数组。             |
| 试题拆分     | 支持将题干、答案、解析同时进行拆分输出。                     |

注：拆分之后输出的内容仍然为HTML格式的数据



## 调用示例

```javascript
const parser = new QuestionParserService();
const strStem = "<div class=\"qml-stem\"><p style=\"\"><span style=\"font-family: 宋体;\">选出不同类的单词。</span></p><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">1. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">these</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">they</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">those</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">2. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">office</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">hospital</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">wish</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">3. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">ship</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">teeth</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">taxi</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">4. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">crayon</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">whale</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">butterfly</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">5. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">harvest</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">near</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">far</span></span></div></div></div></div>";
const stem = parser.splitStem(strStem);
console.log(stem);
```



# 接口能力说明

## 题干拆分

将HTML格式的题干字符串拆分为json对象结构

```javascript
const strStem = "<div class=\"qml-stem\"><p style=\"\"><span style=\"font-family: 宋体;\">选出不同类的单词。</span></p><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">1. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">these</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">they</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">those</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">2. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">office</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">hospital</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">wish</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">3. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">ship</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">teeth</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">taxi</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">4. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">crayon</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">whale</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">butterfly</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">5. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">harvest</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">near</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">far</span></span></div></div></div></div>";
const stem = parser.splitStem(strStem);
console.log(stem);
```

参数：

| 参数名称 | 参数说明    | 数据类型   |
| ---- | ------- | ------ |
| stem | HTML的题干 | String |

返回数据：Stem

| 字段           | 参数说明                                                                                                       | 类型         |
| ------------ | ---------------------------------------------------------------------------------------------------------- | ---------- |
| html         | HTML题干。当题型为选择题时，该字段为选择题的选项之前的题干部分，也就是语料和设问。当题型为填空题时，该字段就是整个试题的题干。当题型为复合题时，该字段就是复合题中小题共用的公共语料，也就是小题之前的题干部分。 | String     |
| type         | 试题结构类型：选择题，填空题，复合题。其中，选择题和填空题为简单题类型，填空题也包括常见的解答题，复合题下面包含小题（小问）。                                            | String     |
| sqIdMode     | 复合题中小题的类型。0=小题，1=小问。小题和小问的区别在于小题的题号在原卷中形如"1."，而小问的题号形如"(1) "，小题题号是整卷内容通排，而小问的题号在复合题内部总是从1开始的。              | Inetger    |
| sqBlankCount | 小题空的个数。小题空是一种特殊的填空，这个填空是一个小题，拥有一个小题号。比如完形填空中的填空。                                                           | Inetger    |
| og           | 选项，当type=选择题时有值。                                                                                           | StemOg     |
| +cols        | 每行布局的选项个数。比如2，代表原卷中一行显示2个选项；4表示原卷中一行显示了4个选项。                                                               | Inetger    |
| +ogOps       | 选项数组                                                                                                       | StemOgOp[] |
| ++index      | 选项序号，用大写字母表示，第一个为A，以此类推。                                                                                   | String     |
| ++html       | 选项的HTML代码                                                                                                  | String     |
| sqs          | 小题数组。当type=复合题时有效。注意：小题是不支持再嵌套小题的，XOP中也没有这样的试题。                                                            | Stem[]     |
| +type        | 小题结构类型，共有两种：选择题、填空题。其中，填空题也包括解答题。                                                                          | String     |
| +html        | 小题的HTML题干。当小题的type=选择题时，该字段为选择题的选项之前的题干部分，也就是语料和设问。                                                        | String     |
| +og          | 选项，当小题的type=选择题时有值。                                                                                        | StemOg     |
| ++cols       | 每行布局的选项个数。比如2，代表原卷中一行显示2个选项；4表示原卷中一行显示了4个选项。                                                               | Inetger    |
| ++ogOps      | 选项数组                                                                                                       | StemOgOp[] |
| +++index     | 选项序号，用大写字母表示，第一个为A，以此类推。                                                                                   | String     |
| +++html      | 选项的HTML代码                                                                                                  | String     |



## 答案拆分

将HTML格式的答案拆分为：答题空答案

```javascript
const strAnswer = "<div class=\"qml-answer\">1. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">B</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">C</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">B</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">A</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">A</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>";
const answer = parser.splitAnswer(strAnswer);
console.log(answer);
```

参数

| 参数名称   | 参数说明    | 数据类型   |
| ------ | ------- | ------ |
| answer | HTML的答案 | String |

返回数据：Answer

| 字段    | 参数说明                                                     | 类型    |
| ------- | ------------------------------------------------------------ | ------- |
| anSqs   | 小题数组，对应复合题题干中的小题。如果试题是简单题，那么该数组中只有一个元素。 | AnSq[]  |
| +ans    | 答案值数组。对应题干中的选项组或者填空。题干中即便没有任何选项组和填空，系统也会默认该题有一个填空，常用于解答题的情形，所以答案中会有一个对应的答案值。 | An[]    |
| ++html  | 答案值的HTML。如果该答案值对应的是题干中的选项组，那么答案值的内容为选项字母序号，比如A、B、C。如果答案是多选的，那么答案值内容为ABC，字母之间没有任何分隔符。 | String  |
| ++op    | 答案值是否为选择题                                           | Boolean |
| ++exact | 答案值是否支持机阅。支持机阅时，答案值的内容是确定的。当支持机阅的时候，还会有两种情况，请参见下面的说明。 | Boolean |

支持机阅的两种特殊情况：

1. 如果答案可以被有限穷举的话，那么答案值中每个参考答案之间使用`##`分割，比如Surprisingly##Amazingly。

1. 在英语学科，答案中个别字符出现或者不出现都是正确的，答案中会将这个字符用小括号括起来，学生的答案中有没有这个字符都是正确的。比如`(s)atisfied`。



## 解析拆分

将HTML格式的解析拆分为多个独立片段

```javascript
const strExplanation = "<div class=\"qml-explanation\"><div class=\"qml-exps-sq\">(1)题详解： <p style=\"\"><span>A这些，B他/她/它们，C那些，AC都是指示代词，B是人称代词，故选B。</span></p></div><div class=\"qml-exps-sq\">(2)题详解： <p style=\"\"><span>A办公室，B医院，C希望，AB都是名词，C是动词，故选C。</span></p></div><div class=\"qml-exps-sq\">(3)题详解： <p style=\"\"><span>A轮船，B牙齿，C出租车，AC都是交通工具名词，B是其他名词，故选B。</span></p></div><div class=\"qml-exps-sq\">(4)题详解： <p style=\"\"><span>A蜡笔，B鲸鱼，C蝴蝶，BC都是动物名词，A是文具用品名词，故选A。</span></p></div><div class=\"qml-exps-sq\">(5)题详解： <p style=\"\"><span>A收获，B近的，C远的，BC都是形容词，A是动词，故选A。</span></p></div></div>";
const explanation = parser.splitExplanation(strExplanation);
console.log(explanation);
```

参数：

| 参数名称        | 参数说明    | 数据类型   |
| ----------- | ------- | ------ |
| explanation | HTML的解析 | String |

返回数据：Explanation

| 字段              | 参数说明                                  | 类型               |
| --------------- | ------------------------------------- | ---------------- |
| explanationSegs | 片段数组                                  | ExplanationSeg[] |
| +name           | 片段名称。常见的名称有分析、详解、点睛、(1)题详解，或者其他自定义的名称 | String           |
| +html           | HTML格式内容                              | String           |



## 试题拆分

一次性将试题的题干、答案、解析进行拆分

```javascript
// 题干
const strStem = "<div class=\"qml-stem\"><p style=\"\"><span style=\"font-family: 宋体;\">选出不同类的单词。</span></p><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">1. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">these</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">they</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">those</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">2. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">office</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">hospital</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">wish</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">3. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">ship</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">teeth</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">taxi</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">4. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">crayon</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">whale</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">butterfly</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">5. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">harvest</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">near</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">far</span></span></div></div></div></div>";
// 答案
const strAnswer = "<div class=\"qml-answer\">1. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">B</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">C</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">B</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">A</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">A</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>";
// 解析
const strExplanation = "<div class=\"qml-explanation\"><div class=\"qml-exps-sq\">(1)题详解： <p style=\"\"><span>A这些，B他/她/它们，C那些，AC都是指示代词，B是人称代词，故选B。</span></p></div><div class=\"qml-exps-sq\">(2)题详解： <p style=\"\"><span>A办公室，B医院，C希望，AB都是名词，C是动词，故选C。</span></p></div><div class=\"qml-exps-sq\">(3)题详解： <p style=\"\"><span>A轮船，B牙齿，C出租车，AC都是交通工具名词，B是其他名词，故选B。</span></p></div><div class=\"qml-exps-sq\">(4)题详解： <p style=\"\"><span>A蜡笔，B鲸鱼，C蝴蝶，BC都是动物名词，A是文具用品名词，故选A。</span></p></div><div class=\"qml-exps-sq\">(5)题详解： <p style=\"\"><span>A收获，B近的，C远的，BC都是形容词，A是动词，故选A。</span></p></div></div>";
// 试题
var question = parser.splitQuestion(strStem, strAnswer, strExplanation);
console.log(question);
```

参数：

| 参数名称        | 参数说明      | 数据类型   |
| ----------- | --------- | ------ |
| stem        | HTML格式的题干 | String |
| answer      | HTML格式的答案 | String |
| explanation | HTML格式的解析 | String |

返回数据：Question

| 字段          | 参数说明 | 类型          |
| ----------- | ---- | ----------- |
| stem        | 题干   | Stem        |
| answer      | 答案   | Answer      |
| explanation | 解析   | Explanation |



# FAQ

Q：为什么我的题干HTML拆分失败了？

A：拆分失败可能有以下几个原因：

- 入参必须使用XOP返回的试题HTML字符串，不能二次加工后再使用该SDK拆分

- 拍搜（海量版）接口返回的试题不支持拆分内部结构



Q：我怎么能不开发直接看一看拆分的效果？

A："JS版SDK"使用说明页中的"Live Demo"支持在线查看拆分效果；同时SDK中有一个DEMO的html文件，也可以直接打开测试拆分效果。

