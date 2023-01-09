import Layout from "@components/layout/Layout";
import type { NextPage } from "next";

const Strong = ({ text }: { text: string }) => {
  return (
    <span className="font-semibold text-primary-focus decoration-primary-focus text-xl">
      {text}
    </span>
  );
};

const Dev: NextPage = (props) => {
  return (
    <Layout>
      <div className="">
        <div className="flex flex-col justify-around gap-3 items-start pl-5 py-5">
          <h2 className="self-center text-4xl">Analysis Problems</h2>
          <div className="flex flex-col lg:flex-row items-start gap-3 justify-center px-7">
            <div>
              <Strong text="Current Situation" />
              <ul className="list-disc list-inside">
                <li className="">Very hard to find delicious recipe</li>
                <li className="">Only lisa tries the recipes</li>
                <li className="">Vegan OK</li>
                <li className="">Offline community only</li>
                <li className="">Only japanese</li>
                <li className="">Zero recipe</li>
              </ul>
            </div>
            <div>
              <Strong text="Ideal" />
              <ul className="list-disc list-inside">
                <li className="">All recipe should be <strong>delicious</strong></li>
                <li className="">Any one can cook, <strong>stable taste</strong>.</li>
                <li className="">Vegan（No meat, no eggs, no onions, no garlic.）</li>
                <li className="">Boost community of vegans</li>
                <li className="">Multi-language (menu + recipe)</li>
                <li className="">少数精鋭？多ければいいけど</li>
              </ul>
            </div>
            <div>
              <Strong text="Tasks（Reduce the gap between ideal and current status）" />
              <ul className="list-disc list-inside">
                <li className="">Prepare recipes and select carefully</li>
                <li className="">多くの人にテストしてもらう</li>
                <li className="">ー</li>
                <li className="">ー</li>
                <li className="">他言語対応？管理者が翻訳し、言語ごとに掲載</li>
                <li className="">ー</li>
              </ul>
            </div>
          </div>

          <div className="px-7 w-full flex flex-col gap-3">
            <h2 className="self-center text-4xl mt-5">Product Back Log (Values to provide)</h2>
            <div>
              <Strong text="Project Start" /> 9/24~
              <ul className="list-disc list-inside">
                <li className="text-slate-400">Recipe list page(Dummy)</li>
                <li className="text-slate-400">A recipe page(Dummy)</li>
                <li className="text-slate-400">Signup page</li>
                <li className="text-slate-400">Signin page</li>
                <li className="text-slate-400">Navigation bar</li>
                <li className="text-slate-400">Landing page</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="Create recipe I" /> 9/28~ (3days)
              <ul className="list-disc list-inside">
                <li className="text-slate-400">Name, description, photo <span>Done (9/28)</span></li>
                <li className="text-slate-400">Upload <span>Done (9/28)</span></li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="Create recipe II" />  (3days)
              <ul className="list-disc list-inside">
                <li className="text-slate-400">Instructions <span>Done (10/1)</span></li>
                <li className="text-slate-400">Ingredients <span>Done (10/2)</span></li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="Recipe page (real data)" /> (1day)
              <ul className="list-disc list-inside">
                <li className="text-slate-400">Recipe list page <span>Done (10/3)</span></li>
                <li className="text-slate-400">A recipe page <span>Done (10/3)</span></li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="Create recipeIII" /> (1days)
              <ul className="list-disc list-inside">
                <li className="text-slate-400 line-through">一時保存中があれば、以前のデータを表示 (10/4保留)</li>
                <li className="text-slate-400">必須項目のエラーメッセージ表示 (10/4)</li>
                <li className="text-slate-400">その他の写真のUpload (10/7)</li>
                <li className="text-slate-400">その他の写真の表示 (10/7)</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="Profile" /> (3days)
              <ul className="list-disc list-inside">
                <li className="text-slate-400">profile page (10/15)</li>
                <li className="text-slate-400">edit profile (10/15)</li>
                <li className="text-slate-400">display avatar on recipe (10/15)</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="Internationalze, multi-language support" />
              <ul className="list-disc list-inside">
                <li className="text-slate-400">Switch Eng between JPN (12/26)</li>
                <li>support chinese</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="Refine Design / improve UX (4 days)" />
              <ul className="list-disc list-inside">
                <li>UI re-design for mobile (2 days)</li>
                <li>UX improve for mobile (2 days)</li>
                <li>UI/UX for tablet (1 day)</li>
                <li>UI/UX for desktop (1 day)</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="Create recipeIV" />
              <ul className="list-disc list-inside">
                <li>how much time it needs</li>
                <li>InstructionごとにPoint追加</li>
                <li>Drag&Dropで写真追加</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="Recipe books" /> (3days)
              <ul className="list-disc list-inside">
                <li className="text-slate-400">own recipes (10/15)</li>
                <li className="text-slate-400">favorite recipes (10/15)</li>
                <li>Editing recipe book</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="初回公開の必須じょうけん" /> (3days)
              <ul className="list-disc list-inside">
                <li>レシピX個</li>
                <li>多言語対応</li>
                <li>レシピの翻訳</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="公開に向けて" />
              <ul className="list-inside list-disc">
                <li>サイト名決定</li>
                <li>ドメインの購入</li>
                <li>ドメイン設定</li>
                <li>限定公開仕組み</li>
                <li>哲学・ヴィジョンの決定</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="テスト公開" />
              <ul className="list-inside list-disc">
                <li>本番とStaging環境の分離</li>
                <li>ドメインの設定</li>
                <li>限定公開仕組み</li>
                <li>哲学・ヴィジョンページ作成</li>
                <li>Header / Footer</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="ユーザー分析のために" />
              <ul className="list-inside list-disc">
                <li>GoogleAnalytics導入調査</li>
                <li>GA測定機能追加?</li>
                <li>GAダッシュボード?</li>
                <li>KPIの設定</li>
                <li>測定機能追加(KPI記録, lambda?)</li>
                <li>Redash作成＆ダッシュボード?</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="Login/Signupをシンプルに" /> (2days)
              <ul className="list-disc list-inside">
                <li>どの方法が適切かを考える</li>
                <li>1) No password login by email</li>
                <li>2) No password login by phone</li>
                <li>3) With password login</li>
                <li>4) 他サイトのアカウントでログイン</li>
                <li>Signupの後にtoasterでメッセージ</li>
                <li>Email confirm</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="セキュリティー" />
              <ul className="list-disc list-inside">
                <li>Email confirm</li>
                <li>User sessionページのrefactor</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="一般公開" />
              <ul className="list-inside list-disc">
                <li>SEO対応</li>
                <li>運用コスト最適化</li>
                <li>refactor / 各種設定レビュー</li>
                <li>多くのレシピー表示対応(Page)</li>
              </ul>
            </div>
            <hr className="w-full border-theme-green" />
            <div>
              <Strong text="改善案を考える" />
              <ul className="list-inside list-disc">
                <li>レビュー/コメント機能</li>
                <li>お気に入りレシピ一覧</li>
                <li>星 / ハート機能</li>
                <li>多言語対応</li>
                <li>その他画像、押したら拡大</li>
                <li>プロフィールとアバタ</li>
                <li>レシピ検索機能</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout >
  );
};

export default Dev;
