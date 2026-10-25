---
name: SHeLTeR
description: "Design system specification for SHeLTeR web application built with Nuxt 3 and Tailwind CSS."
colors:
  background: "#1a1a1a"
  surface:
    neutral-primary: "#2A2A2A"
    neutral-secondary: "#171717"
    neutral-overlay: "#0a0a0ad9"
    neutral-highlight: "#3b3b3b"
    accent: "#EA3A3A"
    tertiary: "#ffffff"
  text:
    primary: "#ffffff"
    secondary: "#171717"
    accent: "#EA3A3A"
    info: "#3a80ea"
  border:
    primary: "#ffffff"
    secondary: "#1a1a1a"
    accent: "#EA3A3A"
typography:
  family-primary:
    en: "Roboto Condensed"
    ja: "YuGothic"
  family-secondary:
    en: "Roboto"
  font-size:
    medium: "1rem"
spacing:
  x-small: "4px"
  small: "8px"
  medium: "16px"
  large: "40px"
  x-large: "56px"
  "1": "8px"
  "2": "16px"
  "3": "24px"
  "4": "32px"
  "5": "40px"
  "6": "48px"
  "7": "56px"
rounded:
  small: "4px"
  default: "8px"
  large: "16px"
---

# SHeLTeR Design System Specification

本ドキュメントは、Google Labsが提唱するAIネイティブなデザインシステム仕様ファイル（`DESIGN.md`）のフォーマットに基づき、**SHeLTeR** プロジェクト（Nuxt 3 + Tailwind CSS）のビジュアルアイデンティティ、デザイントークン、および主要コンポーネントの設計仕様を定義したものです。

YAMLフロントマターにはマシンリーダブルなデザイントークンが定義されており、以下のMarkdown本文には人間およびAIエージェントがコードを実装・拡張する際の指針となる運用ルールを記述しています。

---

## 1. ビジョンとデザインコンセプト (Overview & Vision)

**「Architectural Minimalism & Club Gravitas」**

SHeLTeRのデザインは、深みのあるダークトーンを基調としたミニマリズムと、洗練されたクラブカルチャーの重厚感を融合させています。無駄な装飾を排し、高いコントラストと細いフォントウェイト（Thin / Light）を用いることで、コンテンツ（音楽、スケジュール、ブログ）そのものを際立たせます。

- **Dark & High Contrast**: 背景色（`#1a1a1a`）とシャープなテキスト・ボーダー（`#ffffff`）による対比。
- **Vivid Accent**: インタラクションや注目させるべき要素にのみ、情熱的なレッド（`#EA3A3A`）を採用。
- **Subtle Transitions**: すべての状態変化において、急激な切り替えを避け、なめらかなイージング（`duration-300 ease-out`）を適用。

---

## 2. デザイントークン運用ガイド (Tokens Usage Guidelines)

### 2.1 カラー (Colors)
 Tailwind CSS の設定（[tailwind.config.js](file:///Users/teraokakazutaka/works/shelter-nuxt3/tailwind.config.js)）を通じて、[tokens/SHeLTeR-alias.json](file:///Users/teraokakazutaka/works/shelter-nuxt3/tokens/SHeLTeR-alias.json) の値がクラス名としてマッピングされています。ハードコードされた16進数カラーコードの直接使用は厳禁です。

| カテゴリ | トークン名 | カラーコード | 用途と適用ルール |
| :--- | :--- | :--- | :--- |
| **Background** | `bg-background` | `#1a1a1a` | アプリケーション全体のメイン背景色。ページ全体およびベースとなるセクションに使用。 |
| **Surface** | `bg-surface-nuetral-primary` | `#2A2A2A` | カード要素やコンテナ要素の標準背景。 |
| | `bg-surface-nuetral-secondary`| `#171717` | フッターや一段深いレイヤーの背景。 |
| | `bg-surface-nuetral-overlay` | `#0a0a0ad9` | ヘッダーやモバイルメニューなどの半透明透過レイヤー（約85%不透明度）。 |
| | `bg-surface-accent` | `#EA3A3A` | 強調表示やバッジ等のアクセントサーフェス。 |
| **Text** | `text-text-primary` | `#ffffff` | 基本となるテキストカラー。見出し、本文に適用。 |
| | `text-text-secondary` | `#171717` | 白背景のボタンや明るい要素上のテキスト。 |
| | `text-text-accent` | `#EA3A3A` | ホバー時のテキストや強調リンク。 |
| | `text-text-info` | `#3a80ea` | 情報提示や情報リンク。 |
| **Border** | `border-border-primary` | `#ffffff` | プライマリボタンや区切り線の基本枠線。 |
| | `border-border-accent` | `#EA3A3A` | ホバー時またはアクティブ時のアクセント枠線。 |

### 2.2 タイポグラフィ (Typography)
英語と日本語で美しく調和するフォントペアリングを行っています。

- **欧文（Primary）**: `Roboto Condensed` - 見出しやナビゲーション等、引き締まった印象を与える箇所に使用。
- **和文（Primary）**: `YuGothic`（游ゴシック） - 本文および日本語見出しに使用。
- **欧文（Secondary）**: `Roboto` - 標準的なテキストや特定のタイトル要素に使用。
- **ウェイトの原則**: 太文字（Bold）は極力避け、`font-thin` または `font-light` を基本として上品さを保ちます。

### 2.3 スペーシングとグリッド (Spacing & Layout)
8pxを基本単位とするスケール（`spacing.1` = 8px 〜 `spacing.7` = 56px）を採用しています。
- 余白の調整には `gap-4` (16px), `gap-6` (24px), `mt-6`, `p-4` 等の標準トークンを使用してください。
- 画面レイアウトはトップナビゲーションバーの高さ（モバイル: `40px` / PC: `64px`）を考慮し、メインコンテンツに適切な上部パディング（`pt-[40px] md:pt-[64px]`）を設けます。

---

## 3. 主要コンポーネント仕様 (Core Components)

### 3.1 Button ([components/Button.vue](file:///Users/teraokakazutaka/works/shelter-nuxt3/components/Button.vue))
ユーザーアクションをトリガーするインタラクティブコンポーネントです。

- **バリエーション**:
  - `primary`（デフォルト）: 白枠線（`border-border-primary`）＋ 透明背景。ホバー時に枠線とテキストがアクセントカラー（`hover:border-border-accent hover:text-text-accent`）へ変化。
  - `secondary`: 白背景（`bg-white`）＋ ダークテキスト（`text-text-secondary`）。現在のアクティブなページャーボタンなどに使用。
- **アニメーション**: すべての状態変化に `transition-all duration-300 ease-out` を適用。

```vue
<!-- 使用例 -->
<Button type="primary" icon-left="fa-solid fa-chevron-left" @click="prev">
  BACK
</Button>
```

### 3.2 Card ([components/Card.vue](file:///Users/teraokakazutaka/works/shelter-nuxt3/components/Card.vue))
ブログ記事やイベントスケジュールを視覚的に表示するためのコンテナです。

- **画像オーバーレイ**: 背景画像の上に、下部に近づくにつれて暗くなる線形グラデーション（`linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)`）を重ね、写真上のテキストの可読性を確保。
- **構造**: `NuxtLink` でカード全体をラップし、タイトル（`text-2xl font-light`）と日付（`text-lg font-light`）を下部に配置。

### 3.3 Header ([components/TheHeader.vue](file:///Users/teraokakazutaka/works/shelter-nuxt3/components/TheHeader.vue))
全画面で上部に固定（`fixed top-0`）されるナビゲーションバーです。

- **スクロール挙動**: `useScroll()` コンポーザブルを監視し、下方向スクロール時に自動でヘッダーが画面外（`top-[-40px] md:top-[-64px]`）へ隠れるアニメーション（`duration-300`）を実装。
- **モバイルメニュー**: ハンバーガーボタンタップ時、全画面オーバーレイ（`h-[calc(100vh_-_40px)]`）としてメニューを展開。

### 3.4 Title ([components/TheTitle.vue](file:///Users/teraokakazutaka/works/shelter-nuxt3/components/TheTitle.vue))
セクションの主見出しを表示します。

- **セマンティクス**: `tagName` プロップにより `h1`, `h2`, `figure` 等のHTMLタグを動的に切り替え。
- **スタイリング**: モバイルで `text-4xl`、PCで `text-5xl`。フォントは `Roboto` または `Roboto Condensed` の細字（`font-thin` / `font-light`）を適用。

### 3.5 SlideShow ([components/SlideShow.vue](file:///Users/teraokakazutaka/works/shelter-nuxt3/components/SlideShow.vue))
背景画像の無限ループアニメーションを提供します。
- カスタムキーフレーム `animate-[fade]` を利用し、各スライドが `8秒` 周期で透明度・Zインデックスを切り替えながらクロスフェードします。

---

## 4. AIエージェント向け実装ガイドライン (AI Development Rules)

今後、AIコーディングアシスタント（または開発者）が本リポジトリのUIを修正・拡張する際は、以下のルールを厳守してください。

1. **トークンの直接利用**: 色や余白を指定する際は、必ず `tailwind.config.js` にマッピングされたクラス（例: `bg-background`, `text-text-primary`, `border-border-accent` 等）を使用すること。ハードコードされた任意の値（例: `bg-[#1a1a1a]`）を追加しないこと。
2. **フォントウェイトの維持**: SHeLTeRのトーン＆マナーを守るため、見出しや強調テキストに `font-bold` や `font-extrabold` を使用しないこと。`font-thin`, `font-light`, `font-normal` を原則とする。
3. **トランジションの付与**: ホバー効果や状態切り替えを伴うUI要素を新設する場合は、必ず `transition-all duration-300 ease-out` を付与し、既存コンポーネントと動きのスピード感を統一すること。
4. **コンポーネントの再利用**: ボタンや見出しが必要な場合は、標準の `<button>` や `<h1>` ではなく、`<Button>` および `<TheTitle>` コンポーネントを優先して利用すること。
