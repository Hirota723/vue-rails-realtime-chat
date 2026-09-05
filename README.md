# Vue + Rails Realtime Chat

Vue 3 のフロントエンドと Rails 8 + Action Cable のバックエンドを組み合わせた、リアルタイムチャットアプリです。

## 概要

- フロントエンド: Vue 3, Vite, Vue Router, Pinia
- バックエンド: Rails API + Action Cable
- データベース: SQLite
- リアルタイム通信: WebSocket（Action Cable）

このプロジェクトでは、次の機能を扱います。

- ルーム一覧の表示
- ルームの作成
- メッセージ一覧の取得
- メッセージの送信
- 同じルームに接続しているユーザーへのリアルタイム更新

## ディレクトリ構成

```text
.
├── backend/
│   ├── app/
│   ├── config/
│   ├── db/
│   └── Gemfile
├── frontend/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── vite.config.ts
├── package.json
├── pnpm-lock.yaml
├── README.md
└── .gitignore
```

## 必要環境

- Node.js 20 以上
- pnpm
- Ruby 3.2 以上
- Bundler

## セットアップ

### 1. フロントエンドの依存関係をインストール

```bash
cd frontend
pnpm install
```

### 2. バックエンドの依存関係をインストール

```bash
cd backend
bundle install
```

### 3. 環境変数を設定

フロントエンド側に `.env` を作成します。

```bash
cd frontend
cat > .env <<'EOF'
VITE_API_URL=http://localhost:3000
EOF
```

この値は、Vue 側の API 呼び出しや Action Cable の WebSocket URL 生成に使われます。

### 4. データベースを準備

```bash
cd backend
bundle exec rails db:create db:migrate
```

サンプルデータが必要な場合:

```bash
bundle exec rails db:seed
```

## アプリの起動

プロジェクトルートから実行:

```bash
pnpm dev
```

これにより、次の2つが起動します。

- フロントエンド: http://localhost:3001
- バックエンド: http://localhost:3000

個別に起動する場合:

```bash
# フロントエンド
cd frontend
pnpm dev

# バックエンド
cd backend
bundle exec rails s
```

## 主な API

### ルーム

- `GET /rooms`
- `POST /rooms`

### メッセージ

- `GET /rooms/:room_id/messages`
- `POST /rooms/:room_id/messages`

### Action Cable

- WebSocket エンドポイント: `ws://localhost:3000/cable`

## よく使うコマンド

```bash
# フロントエンドのビルド
cd frontend
pnpm build

# フロントエンドの型チェック
cd frontend
pnpm type-check

# バックエンドの lint
cd backend
bundle exec rubocop

# バックエンドのテスト
cd backend
bundle exec rails test
```

## 補足

- フロントエンドでは `import.meta.env.VITE_API_URL` を使って、localhost の直書きを避けています。
- バックエンドでは Action Cable を使って、別クライアント間でメッセージを同期しています。
- 開発時はフロントエンドとバックエンドを同時に起動しておく必要があります。

## ライセンス

このプロジェクトは学習用およびローカル開発用として作成されています。
