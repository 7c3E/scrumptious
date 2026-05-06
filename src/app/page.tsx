import Link from "next/link";

const storeAddress = "基隆市愛二路60號";
const encodedStoreAddress = encodeURIComponent(storeAddress);
const mapEmbedUrl = `https://www.google.com/maps?q=${encodedStoreAddress}&output=embed`;

export default function ProductPage() {
  return (
    <main className="productPage">
      <Link className="productLink" href="/checkout" aria-label="前往結帳頁面">
        <img className="productImage" src="/edm.jpg" alt="商品活動內容" />
      </Link>

      <Link className="floatingOrderButton" href="/checkout" aria-label="立刻前往結帳頁面下單">
        <span className="floatingOrderKicker">想吃了</span>
        <span className="floatingOrderText">立刻下單</span>
      </Link>

      <section className="storeInfo" aria-labelledby="store-info-title">
        <div className="storeInfoInner">
          <div className="storeInfoDetails">
            <div className="storeInfoIntro">
              <h1 id="store-info-title">上好味便當門市資訊</h1>
              <p>
                預購、團購、企業訂購與現場取貨都可直接聯繫門市，地址與聯絡方式整理在這裡方便確認。
              </p>
            </div>

            <div className="storeActionRow" aria-label="門市聯絡方式">
              <a className="storeAction storeActionPhone" href="tel:24235111">
                <span className="storeActionIcon" aria-hidden="true">☎</span>
                撥打 02-24235111
              </a>
              <div className="storeAction storeActionLine" id="store-line-guidance">
                <span className="storeActionIcon storeActionIconLine" aria-hidden="true" />
                <span className="storeActionText">
                  <strong>LINE 加好友</strong>
                </span>
              </div>
            </div>

            <dl className="storeFacts" aria-label="門市資訊清單">
              <div>
                <dt>地址</dt>
                <dd>{storeAddress}</dd>
              </div>
              <div>
                <dt>電話</dt>
                <dd>02-24235111</dd>
              </div>
              <div>
                <dt>認證</dt>
                <dd>基隆市衛生局評鑑優良店</dd>
              </div>
              <div>
                <dt>服務</dt>
                <dd>預購、現購、大量團購</dd>
              </div>
            </dl>
          </div>

          <aside className="storeMapPanel" aria-label="門市位置">
            <div className="storeMapHeader">
              <p>到店取貨</p>
              <h2>門市位置</h2>
              <span>{storeAddress}</span>
            </div>

            <div className="storeMapFrame">
              <iframe
                title="上好味便當門市位置地圖"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}