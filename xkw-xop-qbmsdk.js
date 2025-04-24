/*
 *  xkw.com Inc. Copyright (c) 2022 All Rights Reserved.
 *
 *  试题html拆分服务
 *  将题库服务拆分出的html格式的题干答案解析拆分出其中的内部结构
 *
 *  使用方法：
 *   var parser = new QuestionParserService();
 *   var stem= parser.splitStem(stemHTML)
 *   var answer=parser.splitAnswer(answerHtml)
 *   var explanation= parser.splitExplanation(explanationHtml);
 *
 *  @author Luozl
 *  @version 1.0
 *  @date 2022年07月01日
 */
function QuestionParserService() {
    var SQ = "sq";
    /**
     * 题干
     */
    var QML_STEM = "qml-stem";
    /**
     * 小题
     */
    var QML_SQ = "qml-sq";
    /**
     * 答题空
     */
    var QML_BK = "qml-bk";
    /**
     * 小问
     */
    var QML_ID_CONTAINER = "id-container";
    /**
     * 小问属性
     */
    var QML_ID_CONTAINER_VAL = "question";
    /**
     * 选项组
     */
    var QML_OG = "qml-og";
    /**
     * 题号
     */
    var QML_QUES_NO = "ques-no";
    /**
     * 选项
     */
    var QML_OP = "qml-op";
    /**
     * 选择题
     */
    var QML_ISOP = "qml-isop";
    /**
     * 答案
     */
    var QML_ANSWER = "qml-answer";
    /**
     * 小题答案
     */
    var QML_AN_SQ = "qml-an-sq";
    /**
     * 答题空
     */
    var QML_AN = "qml-an";
    /**
     * 机阅
     */
    var QML_EXACT = "qml-exact";
    /**
     * 解析
     */
    var QML_EXPLANATION = "qml-explanation";
    /**
     * 解析详情
     */
    var QML_SEG = "qml-seg";
    /**
     * 小题解析
     */
    var QML_EXPS_SQ = "qml-exps-sq";
    /**
     * 解析名称
     */
    var SEG_NAME = "seg-name";
    /**
     * 小题解析详情输出模板
     */
    var SQ_DETAIL = "题详解";
    /**
     * 选项序号(A,B,C,D等)
     */
    var OP_INDEXES = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"
        , "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    function htmlResolve(htmlStr) {
        var parseHTML = "";

        if (typeof DOMParser == "function") {
            parseHTML = function (xmlStr) {
                return (new DOMParser()).parseFromString(xmlStr, "text/html");
            }
        } else {
            throw new Error("No html parser found");
        }
        if (htmlStr == null || htmlStr.trim() == "") {
            throw new Error("需要转化的html不能为空");
        }
        //将文本中\"替换为"
        htmlStr = htmlStr.replaceAll("\\\"", "\"");
        return parseHTML(htmlStr);
    }

    function splitStem(stemElement) {
        if (stemElement == null) {
            return null;
        }
        var retStem = {};
        retStem.sqs = Object.values(stemElement.querySelectorAll("." + QML_SQ + ">." + QML_STEM))
            .map(function (node) {
                return splitStem(node);
            });
        var ogElement = Object.values(stemElement.childNodes).filter(function (element) {
            return hasClass(element, QML_OG)
        });
        retStem.og = splitOg(ogElement.length > 0 ? ogElement[0] : null);
        retStem.html = Object.values(stemElement.childNodes).filter(function (element) {
            return !hasClass(element, QML_SQ) && !hasClass(element, QML_OG);
        }).map(function (element) {
            return element.outerHTML;
        }).join("");
        retStem.type = getQuestionType(retStem);
        //中小题空的个数
        retStem.sqBlankCount = Object.values(stemElement.querySelectorAll("."+QML_BK)).filter(function (element) {
            return element.hasAttribute(SQ)
        }).length;
        //0=小题，1=小问
        retStem.sqIdMode = Object.values(stemElement.querySelectorAll("*")).filter(function (element) {
            return element.hasAttribute(QML_ID_CONTAINER) && element.getAttribute(QML_ID_CONTAINER) === QML_ID_CONTAINER_VAL
        }).length > 0 ? 1 : 0;
        //修复下小题中的字段
        retStem.sqs.forEach(function (element) {
            element.sqIdMode = retStem.sqIdMode;
        })
        return retStem;
    }

    /**
     * 判断一个dom元素是否存在class属性
     * @param element dom元素
     * @param className  class属性名称
     */
    function hasClass(element, className) {
        if (element == null || !element.classList) {
            return false;
        }
        return element.classList.contains(className);
    }

    function getQuestionType(retStem) {
        return retStem.sqs.length > 0
            ? "复合题" : retStem.og != null ? "选择题" : "填空题";
    }

    function splitOg(ogElement) {
        if (ogElement == null) {
            return null;
        }
        var stemOg = {};
        stemOg.ogOps = Object.values(ogElement.querySelectorAll("." + QML_OP)).map(function (element, index) {
            return {"index": OP_INDEXES[index], "html": element.outerHTML};
        })
        // 设置一行显示选项个数
        stemOg.cols = ogElement.children[0] instanceof HTMLTableElement
            ? ogElement.children[0].querySelector("tbody>tr").querySelectorAll("td").length
            : ogElement.querySelectorAll(".qml-op").length;
        return stemOg;
    }

    function splitAnswer(answerElement) {
        if (answerElement == null) {
            return null;
        }
        var answerElements = Object.values(answerElement.body.childNodes)
            .filter(function (node) {
                return hasClass(node, QML_ANSWER)
            });
        if (answerElements == null || answerElements.length !== 1) {
            return null;
        }
        return {
            "anSqs": Object.values(answerElements[0].childNodes).filter(function (element) {
                return hasClass(element, QML_AN_SQ);
            }).map(function (element) {
                return {
                    "ans": Object.values(element.childNodes).filter(function (element) {
                        return hasClass(element, QML_AN);
                    }).map(function (element) {
                        return {
                            "html": hasClass(element, QML_ISOP) ? element.innerHTML : element.outerHTML,
                            "op": hasClass(element, QML_ISOP),
                            "exact": hasClass(element, QML_EXACT) || hasClass(element, QML_ISOP)
                        };
                    })
                };
            })
        }
    }

    function splitExplanation(explanationElement) {
        if (explanationElement == null) {
            return null;
        }
        var explanationElements = Object.values(explanationElement.body.childNodes)
            .filter(function (node) {
                return hasClass(node, QML_EXPLANATION)
            });
        if (explanationElements == null || explanationElements.length !== 1) {
            return null;
        }
        //小题编号
        var sqIndex = 0;
        return {
            "explanationSegs": Object.values(explanationElements[0].childNodes).filter(function (element) {
                return hasClass(element, QML_SEG) || hasClass(element, QML_EXPS_SQ);
            }).map(function (element) {
                return {
                    "name": element.hasAttribute(SEG_NAME) ? element.getAttribute(SEG_NAME) : "(" + (++sqIndex) + ")" + SQ_DETAIL,
                    "html": Object.values(element.children).map(function (element) {
                        return element.outerHTML
                    }).join("")
                };
            })
        };
    }

    return {
        /**
         * 拆分题干
         * @param stem
         */
        splitStem: function (stem) {
            var doc = htmlResolve(stem);
            if (doc == null) {
                return null;
            }
            var stemElements = Object.values(doc.body.childNodes)
                .filter(function (node) {
                    return hasClass(node, QML_STEM)
                });
            if (stemElements == null || stemElements.length !== 1) {
                return null;
            }
            return splitStem(stemElements[0]);
        },
        /**
         * 拆分答案
         * @param answer
         */
        splitAnswer: function (answer) {
            var doc = htmlResolve(answer);
            if (doc == null) {
                return null;
            }
            return splitAnswer(doc);
        },
        /**
         * 拆分解析
         * @param explanation
         */
        splitExplanation: function (explanation) {
            var doc = htmlResolve(explanation);
            if (doc == null) {
                return null;
            }
            return splitExplanation(doc);
        },
        /**
         * 拆分试题
         * @param stem
         * @param answer
         * @param explanation
         */
        splitQuestion: function (stem, answer, explanation) {
            var stemDocument = htmlResolve(stem);
            var answerDocument = htmlResolve(answer);
            var explanationDocument = htmlResolve(explanation);
            var question = {};
            question.stem = splitStem(stemDocument);
            question.answer = splitAnswer(answerDocument);
            question.explanation = splitExplanation(explanationDocument);
            return question;
        },
    };
}
