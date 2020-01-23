# LearnTsOop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

前言
面向对象编程离不开对象的序列化与反序列化。LS大法读取与保存是避不开的话题，开篇就从此入手通过一些场景来说明采用面向对象编程的一些可取之处。
场景设定及需求目标
此处怕用户权限为老生常谈，故用工作相关的设施设备管理作为需求及应用场景，望能举一反三。
本文的需求目标：
简单梳理设施及设备的对象实体及关联关系（ER）
简单抽象，并建立类
类到JSON文件的序列化与反序列化
借助反射机制的序列化与反序列化
实体与关系（ER）
实体两个：设施（Facility）、设备（Device）；
关系：一包含关系：一个Facility包含多个Device；
配置：设施类别（Facility Category）。
由于简单，不上ER图了。
抽象（OMG）
抽象基于现实需求以及实际情况，再结合一定的扩展性，设计为如下：
建立抽象基类（Element），目的：与万物之母Object建立中间保护层，便于后期可以用instanceof区分自建类及其它对象类，另抽象部分虚拟函数；
建立实体基类（EntityElement）与配置基类（ConfigElement），都继承自Element，此目的可区分实体与配置的不同行为，比如后期实体序列化到数据库，配置序列化到JSON；
实体基类（EntityElement），抽象实体共有属性，例如ID、名称、描述等；
配置基类（ConfigElement），抽象配置共有属性，例如配置名称、配置值等；
设施（Facility）、设备（Device）继承实体基类（EntityElement），设施类别（Facility Category）继承配置基类（ConfigElement）。
缺图，后补
序列化与反序列化
为了便于演示，实体基类也暂序列化到JSON，目前设计完全支持序列化到Mongo。