# 简介

***

学科网开放平台提供了JS版本的题库SDK，本文档主要针对JavaScript开发者，对于题库能力提供一些辅助的服务。gitHub地址：[https://github.com/xkw-mp/xkw-xop-js-qbmsdk](https://github.com/xkw-mp/xkw-xop-js-qbmsdk)

### 接口能力

| 接口能力 | 接口能力简要描述                                             |
| -------- | ------------------------------------------------------------ |
| 题干拆分 | 将HTML格式的题干拆分为：题干、选项、小题、小问               |
| 答案拆分 | 将HTML格式的答案拆分为：答题空答案                           |
| 解析拆分 | 将HTML格式的解析拆分为：小题解析、分析、点睛等自定义片段     |
| 试题拆分 | 合并题干答案解析拆分功能，对于输入的题干答案解析进行统一拆分，输出一道试题的拆分结果 |

注：切分之后都是html格式的数据

# 快速入门

***

**支持浏览器版本：IE9+**

### **直接使用JS-SDK**

1). 点击[下载JS-SDK](https://static.zxxk.com/baseapp/xop/xkw-xop-js-qbmsdk-1.0.1.zip)；

2). 复制到工程文件夹中，即可使用。

## 接口使用

```javascript
const parser = new QuestionParserService();
const strStem = "<div class=\"qml-stem\"><p style=\"\"><span style=\"font-family: 宋体;\">选出不同类的单词。</span></p><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">1. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">these</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">they</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">those</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">2. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">office</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">hospital</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">wish</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">3. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">ship</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">teeth</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">taxi</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">4. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">crayon</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">whale</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">butterfly</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">5. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">harvest</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">near</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">far</span></span></div></div></div></div>";
const stem = parser.splitStem(strStem);
console.log(stem);
```



### 基本配置说明

暂时无需配置额外参数



# 接口能力说明

***

## 题干拆分

将HTML格式的题干拆分为：主题干、选项、小题、小问

```javascript
const strStem = "<div class=\"qml-stem\"><p style=\"\"><span style=\"font-family: 宋体;\">选出不同类的单词。</span></p><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">1. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">these</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">they</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">those</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">2. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">office</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">hospital</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">wish</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">3. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">ship</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">teeth</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">taxi</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">4. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">crayon</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">whale</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">butterfly</span></span></div></div></div><div class=\"qml-sq\"><div class=\"qml-stem\"><br/><span class=\"ques-no\">5. </span><div class=\"qml-inline qml-og\">A.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">harvest</span></span>　　　　B.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">near</span></span>　　　　C.&nbsp;<span class=\"qml-op\"><span style=\"font-family: 'Times New Roman';\">far</span></span></div></div></div></div>";
const stem = parser.splitStem(strStem);
console.log(stem);
```

参数：

| 参数名称 | 参数说明   | 数据类型 |
| -------- | ---------- | -------- |
| stem     | html的题干 | String   |

返回数据：Stem

| 字段          | 参数说明                                           | 类型       |
| ------------- | -------------------------------------------------- | ---------- |
| html          | 题干                                               | String     |
| type          | 试题结构类型：选择题，填空题，复合题               | String     |
| sqIdMode      | 0=小题，1=小问                                     | Inetger    |
| sqBlankCount  | 题干中小题空的个数                                 | Inetger    |
| og            | 选项                                               | StemOg     |
| +cols         | 每行显示选项个数                                   | Inetger    |
| +ogOps        | 选项组(有序数组，例如有4个选项，那么选项为ABCD)    | temOgOp[]  |
| ++html        | 选项的html数据                                     | String     |
| sqs           | 小题(小问)：小题或者小问下面不允许再有小题或者小问 | Stem[]     |
| +type         | 类型                                               | String     |
| +sqIdMode     | 0=小题，1=小问                                     | Inetger    |
| +sqBlankCount | 题干中小题空的个数                                 | Inetger    |
| +html         | 选项的html数据                                     | String     |
| +og           | 小题(小问)选项组                                   | StemOg     |
| ++cols        | 每行显示选项个数                                   | Inetger    |
| ++ogOps       | 选项组(有序数组)                                   | StemOgOp[] |
| +++html       | 选项的html数据                                     | String     |
| +++index      | 选项序号(A,B,C,D等)                                | String     |

## 答案拆分

多选答案是否拼接在一起

将HTML格式的答案拆分为：答题空答案

```javascript
const strAnswer = "<div class=\"qml-answer\">1. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">B</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">C</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">B</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">A</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. <span class=\"qml-an-sq\"><span class=\"qml-an qml-isop \">A</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>";
const answer = parser.splitAnswer(strAnswer);
console.log(answer);
```

参数

| 参数名称 | 参数说明   | 数据类型 |
| -------- | ---------- | -------- |
| answer   | html的答案 | String   |

返回数据：Answer

| 字段    | 参数说明                               | 类型    |
| ------- | -------------------------------------- | ------- |
| anSqs   | 答案组(有序数组)                       | AnSq[]  |
| +ans    | 小题(小问)答案(有序数组)               | An[]    |
| ++html  | 答案html(如果是选择题，答案为选项序号) | String  |
| ++op    | 是否选择题                             | Boolean |
| ++exact | 是否支持机阅                           | Boolean |

## 解析拆分

将HTML格式的解析拆分为：小题解析、分析、点睛等自定义片段

```javascript
const strExplanation = "<div class=\"qml-explanation\"><div class=\"qml-exps-sq\">(1)题详解： <p style=\"\"><span>A这些，B他/她/它们，C那些，AC都是指示代词，B是人称代词，故选B。</span></p></div><div class=\"qml-exps-sq\">(2)题详解： <p style=\"\"><span>A办公室，B医院，C希望，AB都是名词，C是动词，故选C。</span></p></div><div class=\"qml-exps-sq\">(3)题详解： <p style=\"\"><span>A轮船，B牙齿，C出租车，AC都是交通工具名词，B是其他名词，故选B。</span></p></div><div class=\"qml-exps-sq\">(4)题详解： <p style=\"\"><span>A蜡笔，B鲸鱼，C蝴蝶，BC都是动物名词，A是文具用品名词，故选A。</span></p></div><div class=\"qml-exps-sq\">(5)题详解： <p style=\"\"><span>A收获，B近的，C远的，BC都是形容词，A是动词，故选A。</span></p></div></div>";
const explanation = parser.splitExplanation(strExplanation);
console.log(explanation);
```

参数：

| 参数名称    | 参数说明   | 数据类型 |
| ----------- | ---------- | -------- |
| explanation | html的解析 | String   |

返回数据：Explanation

| 字段            | 参数说明                                                     | 类型             |
| --------------- | ------------------------------------------------------------ | ---------------- |
| explanationSegs | 解析的细分段落名称：分析，详解，点睛，小题1(2)详解，或者自定义的名称 | ExplanationSeg[] |
| +name           | 细分段落名称：分析，详解，点睛，小题1(2)详解，或者自定义的名称 | String           |
| +html           | 内容Html                                                     | String           |

## 试题拆分

对HTML格式的试题进行拆分，拆分出题干答案解析，其中题干答案解析都需要按照上面的题干答案解析接口进行拆分

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

| 参数名称    | 参数说明   | 数据类型 |
| ----------- | ---------- | -------- |
| stem        | html的试题 | String   |
| answer      | html的答案 | String   |
| explanation | html的解析 | String   |

返回数据：Question

| 字段        | 参数说明 | 类型        |
| ----------- | -------- | ----------- |
| stem        | 题干     | Stem        |
| answer      | 答案     | Answer      |
| explanation | 解析     | Explanation |



# 错误信息

***

### 会出现错误的情况

1. 使用的不是xopqbm返回的html数据

1. 需要传递的是试题的题干html，但是传递了答案或者解析的html

1. 对xopqbm返回的html数据做了其他处理，破坏了原有的结构，再调用接口有可能报错
