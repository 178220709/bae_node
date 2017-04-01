'use strict';
var request = require('request')
var then = require('thenjs');
var _ = require("lodash")
var log = console.log.bind(console)
//https://cnodejs.org/topic/580599e00bab808265185ebc
let getUrlAsync = function (opt) {
    return then(function (cont) {
        request(opt, (err, res, data)=> {
            console.log(res.request.path + "==>:  " + data);
            cont(err, _.isString(data) ? JSON.parse(data) : data)
        })
    })
};
let res = {
    newQuestion: ()=> getUrlAsync({
        method: "post",
        uri: "http://hr.amiaodaifu.com:50000/1610/new-question",
        form: {mail: 'sj178220709@163.com'}
    }),
    getChild: (id, rootId)=> getUrlAsync(`http://hr.amiaodaifu.com:50000/1610/questions/${id}/get-children/${rootId}`, "get"),
    checkTree: (questionId, root)=> getUrlAsync({
        url: `http://hr.amiaodaifu.com:50000/1610/questions/${questionId}/check`,
        method: "post",
        form: {root: JSON.stringify(root)}
    }),
};
//{"id":"05f0556c-d6dd-43dc-b665-f3dbeb53f106","rootId":1}

let getTree = function (questionId, rootId, callback) {
    let node = {
        id: rootId,
        children: []
    };
    let nodeQueue = [{id: rootId, node: node}];

    let getNode = function () {
        if (nodeQueue.length == 0) {
            let result = _.cloneDeep(node);
            node = null;
            callback(null, questionId, result)
        } else {
            let ids = nodeQueue.map(a=>a.id)
            then.each(ids, (cont, _id)=> {
                let qnode = _.find(nodeQueue, n=>n.id === _id);
                res.getChild(questionId, qnode.id).then((_cont, data)=> {
                    //when getOneChild return and callback
                    //create children nodes
                    let childs = data.map(a=> Object({id: a, children: []}));
                    //remove queue
                    _.remove(nodeQueue, (n)=>n.id === qnode.id);
                    //set current node's children and push them  in queue(recursion)
                    childs.forEach(c=> {
                        qnode.node.children.push(c);
                        nodeQueue.push({id: c.id, node: c})
                    });
                    cont(null)
                })
            }).then(cont => {
                //next recursion
                getNode()
            })
        }
    };

    getNode()
}


res.newQuestion().then((cont, data)=> {
    let id = data.id;
    let rootId = data.rootId;
    getTree(id, rootId, cont)
}).then((cont, questionId, tree)=> {
    log(JSON.stringify(tree));
    res.checkTree(questionId, tree).then((_cont, data)=> {
        log(data)
    })
})
