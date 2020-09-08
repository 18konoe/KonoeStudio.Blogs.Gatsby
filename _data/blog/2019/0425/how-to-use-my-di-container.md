---
template: BlogPost
path: /how-to-use-my-di-container
date: 2019-04-25
lastupdate: 2019-04-25
title: "自作した.NET C#用のDIコンテナの使い方説明"
thumbnail: /thumbnail/20190425.jpg
category_name: "説明・解説"
category_slug: "explanation"
tags: ["C#"]
---

先日、GitHub に自作の C#用 DI コンテナを MIT ライセンスで公開しました。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://github.com/18konoe/KonoeStudio.Libs.DependencyInjection" data-iframely-url="//cdn.iframe.ly/11155cn?omit_script=1"></a></div></div>

.NET Framework 4.5 と.NET Standard 2.0 の両対応です。

こちらの DI コンテナではコンストラクタにインジェクトするタイプだけをサポートしています。

## 導入

簡単に導入できるように Nuget パッケージで公開しています。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://nuget.org/packages/KonoeStudio.Libs.DependencyInjection/" data-iframely-url="//cdn.iframe.ly/8UkgRG1?omit_script=1"></a></div></div>

## Demo 用クラスの紹介

DI コンテナに登録していくクラス達です。

### 1. なにもないクラス

```csharp
public interface INoMeanInterface
{
    // 何もないインターフェース
}

public class NoMeanClass : INoMeanInterface
{
    // 何もないインターフェースを継承するクラス
}
```

### 2. なにもないクラスを注入されるクラス（インターフェースなし）

```csharp
public class HaveNoMeanConstructor
{
    // NoMeanInterfaceをコンストラクタでDIしてもらうクラス
    public INoMeanInterface NoMean { get; set; }

    public HaveNoMeanConstructor(INoMeanInterface noMean)
    {
        NoMean = noMean;
    }
}
```

### 3. int と string をコンストラクタから注入できるクラス

```csharp
public interface ILiteralConstructor
{
    // intとstringだけもつインターフェース
    int Num { get; }
    string Str { get; }
}

public class LiteralConstructor : ILiteralConstructor
{
    // intとstringをDIしてもらうクラス
    public LiteralConstructor(int num, string str)
    {
        Num = num;
        Str = str;
    }

    public int Num { get; }
    public string Str { get; }
}
```

### 4. 1 と 3 のクラスをコンストラクタから注入できるクラス

```csharp
public interface IDependedConstructor
{
    // INoMeanInterfaceとILiteralConstructorをもつインターフェース
    INoMeanInterface NoConstructor { get; }
    ILiteralConstructor LiteralConstructor { get; }
}
public class DependedConstructor : IDependedConstructor
{
    // INoMeanInterfaceとILiteralConstructorをDIしてもらうクラス
    public INoMeanInterface NoConstructor { get; }
    public ILiteralConstructor LiteralConstructor { get; }

    public DependedConstructor(INoMeanInterface noConstructor, ILiteralConstructor literalConstructor)
    {
        NoConstructor = noConstructor;
        LiteralConstructor = literalConstructor;
    }
}
```

### 5. 1 と 3 と 4 のクラスと int をコンストラクタから注入できるクラス

```csharp
public interface IComplexConstructor
{
    // INoMeanInterfaceとILiteralConstructorと
    // IDependedConstructorとintをもつインターフェース
    INoMeanInterface NoConstructor { get; }
    ILiteralConstructor LiteralConstructor { get; }
    IDependedConstructor DependedConstructor { get; }
    int Arg1 { get; }
}
public class ComplexConstructor : IComplexConstructor
{
    // INoMeanInterfaceとILiteralConstructorと
    // IDependedConstructorとintをDIしてもらうクラス
    public INoMeanInterface NoConstructor { get; }
    public ILiteralConstructor LiteralConstructor { get; }
    public IDependedConstructor DependedConstructor { get; }
    public int Arg1 { get; }

    public ComplexConstructor(INoMeanInterface noConstructor, ILiteralConstructor literalConstructor, IDependedConstructor dependedConstructor, int arg1)
    {
        NoConstructor = noConstructor;
        LiteralConstructor = literalConstructor;
        DependedConstructor = dependedConstructor;
        Arg1 = arg1;
    }
}
```

## Demo1: 基本の登録と調達

はじめに最もシンプルな使い方を説明します。これから Demo 用クラス 2 の `HaveNoMeanConstructor` クラスのインスタンスを調達しようと思います。その時 `HaveNoMeanConstructor` クラスのコンストラクタに指定している `INoMeanInterface` インターフェースには `NoMeanClass` クラスのインスタンスを DI コンテナに作ってもらいたいとします。

まず、この DI コンテナの窓口は `DiVendor` クラスのインスタンスです。そしてこの DI コンテナでは調達したいクラスは全て登録する必要があります。今回で言うと内部で要求される `INoMeanInterface` インターフェースを継承する `NoMeanClass` クラスと、`HaveNoMeanConstructor` クラスを `Register` メソッドで登録しておきます。この登録順は前後しても構いません。

```csharp
public void Demo1()
{
    // DiVendorの初期化
    DiVendor diVendor = new DiVendor();

    // InoMeanInterfaceが要求されたら、NoMeanClassを渡すように登録する
    diVendor.Register<INoMeanInterface, NoMeanClass>();

    // HaveNoMeanConstructorが要求されたら、HaveNoMeanConstructorを渡すように登録する（登録順序は自由）
    diVendor.Register<HaveNoMeanConstructor>();

    // HaveNoMeanConstructorを調達してもらう。コンストラクタで要求するINoMeanInterfaceは自動で解決する
    HaveNoMeanConstructor haveNoMeanConstructor = diVendor.Procure<HaveNoMeanConstructor>();

    // Disposeすることで、これまでDiVendorが調達するために生成されたインスタンスを全て破棄する
    diVendor.Dispose();
}
```

このように書いて実行すると、`haveNoMeanConstructor` には、中に `NoMeanClass` クラスのインスタンスを持った `HaveNoMeanConstructor` クラスのインスタンスが代入されます。

調達されるインスタンスは、何も設定しなければデフォルトでシングルトンかつ遅延作成されます。`Register` メソッドの引数から変更することが可能です。

また、`DiVendor` を Dispose すると、それまでに調達してもらうために作られた全てのインスタンスを破棄するよう試みます。この関数で破棄してもらうには、登録するクラスが `IDisposable` インターフェースを継承している必要があります。

## Demo2: 複雑なクラス構成の対応

より複雑な状況にもある程度対応することができます。コンストラクタに注入する値は、デフォルトの自動解決の他に手動で決めておくことができます。それを実現するには `DiBlueprint` クラスのインスタンスを作成する必要があります。これは `DiArchitect` クラスのインスタンスから `CreateBlueprint<T>`メソッドを使って作成することができます。

`DiBlueprint` クラスにある `AppendArgumentInfo<T>`メソッドをチェインしていくことで、引数の設定を付属させることができます。ここではコンストラクタに `int` と `string` を持つ `LiteralConstructor` クラスに、インスタンス生成時に任意の値を代入するよう設定しています。ここで生成された `DiBlueprint` クラスのインスタンスを `Register` メソッドの引数に与えることで、調達時にその内容の通りに動作させることができます。

```csharp
public void Demo2()
{
    // DiVendorの初期化
    DiVendor diVendor = new DiVendor();

    // DiArchitectはIDiBlueprintを作成できる
    IDiArchitect diArchitect = new DiArchitect();

    // LiteralConstructorクラスはシングルトンではなく、必要とされる度に毎回newする
    bool isSingleton = false;
    // LiteralConstructorクラスはRegister時にインスタンスを作成せず、必要とされる時にnewする
    bool isLazyinitialized = true;

    // DiArchitectにLiteralConstructorを供給するのに必要な設計図(Blueprint)を作成してもらう
    IDiBlueprint blueprint = diArchitect
        .CreateBlueprint<LiteralConstructor>(isSingleton, isLazyinitialized)
        .AppendArgumentInfo(typeof(int), 10)         // LiteralConstructorクラスのコンストラクタに必要な値をDiArgumentInfoクラスで作成する
        .AppendArgumentInfo<string>("TEST"); // 作成方法は二通りある。必ずコンストラクタ引数の型と値をセットにすること

    // DiVendorにILiteralConstructorが要求されたら、LiteralConstructorを渡すように設計図付きで登録する
    diVendor.Register<ILiteralConstructor, LiteralConstructor>(blueprint);

    // IDependedConstructorを毎回生成するように登録する
    diVendor.Register<IDependedConstructor, DependedConstructor>(false);

    // Demo1と同様にInoMeanInterfaceを登録する（登録順序は自由）
    diVendor.Register<INoMeanInterface, NoMeanClass>();

    // IDependedConstructorを調達してもらう。下記2つのインスタンス中のINoMeanInterfaceは同一のインスタンス
    // だが、IDependedConstructorとILiteralConstructorはそれぞれ異なるインスタンスになっている(isSingleton = false としたから)
    IDependedConstructor depended1 = diVendor.Procure<IDependedConstructor>();
    IDependedConstructor depended2 = diVendor.Procure<IDependedConstructor>();

    // もしIDependedConstructorをシングルトンとして登録した場合は、その中に設定されるILiteralConstructorも単一になってしまうため注意
}
```

## Demo3: null を与えた場合の対応

`DiBlueprint` クラスの `AppendArgumentInfo<T>`メソッドの引数に `null` を与えた場合、DI コンテナが内部でインスタンスを調達する設定となります。実際に `null` を代入したい場合は、第二引数を `true` とすることで、DI コンテナに調達させずに `null` を代入させることができます。
