import Link from 'next/link'
import { endianness } from 'os'

export const metadata = {
    title: '漫画リレー | 利用ルール',
  };

export default function Home() {
  return (
    <div className="main" style={{ width: '100%', maxWidth: '600px', margin: '120px auto 0 auto'}}>
    <h1 className='title-manga text-5xl mb-6'>漫画リレーの利用ルール</h1>

    <h2>禁止された投稿について</h2>
    <p>漫画リレー内で投稿するすべてのコンテンツにおいて非常識な不適切コンテンツを禁止します。<br/>
    詳細は以下の通りです。</p>
    <ul>
        <li>他者の著作物の無断使用</li>
        <li>他者に対する明白な敵意･嫌がらせ</li>
        <li>荒らし(スパム)行為</li>
        <li>過度な性的･残虐的な表現</li>
    </ul>

    <h2>投稿における注意点</h2>
    <ul>
        <li>投稿の削除は原則出来ません。</li>
        <li>ルールに違反していると判断された投稿は削除する場合があります。</li>
    </ul>

    <h2>アカウントに関する注意点</h2>
    <ul>
        <li>アカウントの削除はGoogleアカウントの設定から連携を解除することで可能ですが、Googleソーシャルログインの使用上完全なものでは無いため投稿等のデータの削除はされません。</li>
        <li>ルールに違反していると判断されたアカウントは場合によっては永久追放します。</li>
    </ul>
    </div>
  )
}