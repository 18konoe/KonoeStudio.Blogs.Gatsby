---
template: BlogPost
path: /how-to-convert-display-port-to-usb-type-c-input
date: 2020-07-11
lastupdate: 2020-07-11
title: "DisplayPort出力しかないPCからUSB Type-C入力しかないディスプレイを使う方法"
thumbnail: /thumbnail/20200711.jpg
category-name: "説明・解説"
category-slug: "explanation"
tags: ["自作PC"]
---

2019 年頃から、Lenovo ThinkVision M14 に代表されるような USB Type-C(a.k.a. USB-C)入力のみを搭載した外付けディスプレイ製品が増えてきました。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://www.amazon.co.jp/Lenovo-%25E3%2583%25AC%25E3%2583%258E%25E3%2583%259C%25E3%2583%25BB%25E3%2582%25B8%25E3%2583%25A3%25E3%2583%2591%25E3%2583%25B3-61DDUAR6JP-ThinkVision-M14/dp/B07TNNRL9F" data-iframely-url="//cdn.iframe.ly/R7uQG8K?iframe=card-small&omit_script=1"></a></div></div>

USB Type-C は Display Alt Mode をはじめとした、これまでの USB では実現できないユースケースが多くある一方で、一般ユーザーにとって紛らわしい暗黙の常識があります。

## 問題点

USB Type-C を DisplayPort に変換するケーブルは数多く販売していますが、実はほとんどのケーブルが USB Type-C の出力（PC 側）を DisplayPort（ディスプレイ側）に変換するという前提で作られています。

ですので、**逆に PC 側が DisplayPort・ディスプレイ側が USB Type-C の場合は使えません**。

## 解決法

かなり調べた結果、**双方向対応の変換ケーブルというものが存在**していることがわかりました。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://www.amazon.co.jp/StarTech-com-USB-Type-C-DisplayPort-Thunderbolt/dp/B083YWGPW1" data-iframely-url="//cdn.iframe.ly/wkxVtuP?iframe=card-small?iframe=card-small&omit_script=1"></a></div></div>

実際に ThinkVision M14 に接続して動作することを確認しました。注意点としては、DisplayPort には給電機能がないため、接続ポートの反対側のポートから USb Type-C PD 対応の電源を供給する必要があります。
