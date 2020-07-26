---
template: BlogPost
path: /exchange-thermistor-on-gigabyte-motherboard
date: 2020-06-12
lastupdate: 2020-06-12
title: "GIGABYTEマザーボードにKoolanceの水温計を付けられるのか調べた"
thumbnail: /thumbnail/20200612.jpg
category-name: "改造や交換の方法"
category-slug: "improve"
tags: ["自作PC"]
---

ASRock X570 AQUA を手放した代わりに、GIGABYTE X570 Aorus Master を購入しました。Aorus Master には温度センサー（サーミスタ）が付属しています。そして当然それを挿すピンも。

今回は付属品以外のサーミスタが動作するかを確認したので、その内容についてまとめたいと思います。

## 背景

私の PC は水冷環境であるため、水温系は欲しいところです。こちらの Thermaltake の水温系は持っていますが、下記のような問題があります。

- PC 上で表示できない（直接視認するしかない）
- 幅があるので場所が必要（表示のために横にする必要がある）
- 表からいい感じに見えるように配置するのが意外と大変

<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 52.5%; padding-top: 120px;"><a href="https://www.amazon.co.jp/Thermaltake-Pacific-Temperature-CL-W151-CU00BL-%25E6%25B6%25B2%25E4%25BD%2593%25E5%2586%25B7%25E5%258D%25B4%25E5%2599%25A8%25E7%2594%25A8%25E3%2583%2587%25E3%2582%25B8%25E3%2582%25BF%25E3%2583%25AB%25E3%2583%2587%25E3%2582%25A3%25E3%2582%25B9%25E3%2583%2597%25E3%2583%25AC%25E3%2582%25A4/dp/B074DQGK7C" data-iframely-url="//cdn.iframe.ly/Etv2D9Z?iframe=card-small&omit_script=1"></a></div></div>

これを解決するために、温度計用のピンヘッダを持つマザーボードに、別途 2 ピンの水冷用サーミスタを接続できないかと考えました。

## 購入した水温計

[Koolance Coolant Temperature Sensor Plug, 10K Ohm - SEN-AP008G](https://koolance.com/coolant-temperature-sensor-plug-10k-ohm)
![](./01.jpg)

Description に書いてある通り、25°C で 10KΩ となるセンサーです。

> Coolant thermistor temperature sensor compatible with Koolance multi-sensor systems. Sensor fitting is G 1/4 BSPP (parallel) threaded. Wire length = 30" (76cm). NOTE: This sensor will only work with Koolance products which use 10K Ohm @25°C sensors (first introduced in 2011).

マザーボードに付属するサーミスタの詳細は不明です。同じ仕様だとわかれば簡単なのですが、わからないので温度に対する抵抗値の変化を調べ、互換可能か判断することにしました。

今回の私のユースケースにおいては、水温に応じてファンの回転数を上下させることが目的になるので、起こりうるシチュエーションに対して大体似たような抵抗値であれば良しとしたいと思います。

## 温度に対する抵抗値比較

サーミスタは温度が上がると抵抗値が下がります。ということは同じ環境において大体同じくらいの抵抗値になれば、それは大体同じ動作をする温度センサーと言えるのではないでしょうか。

手っ取り早くマザーボードを動作させられる環境があるなら、両方を接続して表示される温度を比較しても良いかもしれません。今回は水と湯につけたとき、そして部屋での抵抗値をテスターで比較しました。

|             |  付属品  | SEN-AP008G |
| :---------: | :------: | :--------: |
|     水      | 10.26 KΩ |  10.18 KΩ  |
| 部屋 (26℃)  | 9.38 KΩ  |  9.44 KΩ   |
| 湯 (約 40℃) | 5.90 KΩ  |  5.91 KΩ   |

ほぼ同じですね。抵抗特性は対数グラフのため、温度が高いときほど差が小さいのも予想通りです。
これは付属品も*だいたい 25°C で 10KΩ となるサーミスタだと判断しても良さそう*です。

## 温度計用のピンアサイン

マザーボードの説明書にピンアサインが書いてあります。

![](./02.png)

温度計側は先端に印のついている側が SENSOR IN です。見えている金属部分にテスターを当てて測定しました。

![](./03.jpg)

## おわりに

GIGABYTE X570 Aorus Master の付属品であるサーミスタと、Koolance の水温計の抵抗値を比較しました。様々な環境でテストしたわけではありませんが、**水温の上昇に歯止めがかかるように自動でファン回転数を調整するには十分利用できると考えられる**程度には同じような抵抗値であるとわかりました。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://www.amazon.co.jp/GIGABYTE-X570-AORUS-MASTER-X570%25E3%2583%2581%25E3%2583%2583%25E3%2583%2597%25E3%2582%25BB%25E3%2583%2583%25E3%2583%2588%25E6%2590%25AD%25E8%25BC%2589/dp/B07SSM6CLC" data-iframely-url="//cdn.iframe.ly/sHo05Fg?iframe=card-small&omit_script=1"></a></div></div>

GIGABYTE のその他ないし今後のマザーボードで同様のサーミスタが使われるかは不明ですが、付属品以外のサーミスタを接続したい方に有用な情報となれば幸いです。
