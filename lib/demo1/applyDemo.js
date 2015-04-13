var alert = function (arg) {
    console.log(arg)
}

var demo1 = function () {
    function add(a, b) {
        alert(a + b);
    }

    function sub(a, b) {
        alert(a - b);
    }

    add.call(sub, 3, 1);
}

var demo2 = function () {
    function Animal() {
        this.name = "Animal";
        this.showName = function () {
            alert(this.name);
        }
    }

    function Cat() {
        this.name = "Cat";
    }

    var animal = new Animal();
    var cat = new Cat();

//通过call或apply方法，将原本属于Animal对象的showName()方法交给对象cat来使用了。
//输入结果为"Cat"
    animal.showName.call(cat, ",");
    animal.showName.apply(cat, []);
}
var demo3 = function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.money = 500;
    }

    function myFun(money) {
        alert(this.money);
    }

    var money = 100;
    myFun(money);
//return 100;  //window.myFun(money); save to myFun(money);
//这个时候this指向的是window对象，其实myFun函数和定义的var money = 100;都作为window对象子对象（即全局对象）

   // myFun.apply(window, []);  //save to window.myFun.apply(window,[]);
//return 100;  //同上

    myFun.apply(new Person('zhangsan', 23), []);
//return 500, 空数组作为参数，仅符合语法要求
//这个时候myFun方法里面的this指向的是new Person('zhangsan',23)对象，二不是myFun类(函数)，故弹出500

    myFun.call(new Person('zhangsan', 23), money, 300, 'mycardId');
//return 500, 后面money,300和mycardId是参数列表作为参数，一一列出
//这个时候myFun方法里面的this指向的是new Person('zhangsan',23)对象，二不是myFun类(函数)，故弹出500

}


demo3();