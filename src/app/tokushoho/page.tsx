import { Metadata } from "next";
import { getSiteConfig } from "@/lib/itunes";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表示",
  description: "特定商取引法に基づく表示",
};

export default function TokushohoPage() {
  const config = getSiteConfig();
  const tokushoho = config.tokushoho;
  
  const items = [
    { label: "事業者の名称", value: tokushoho.businessName },
    { label: "代表者または通信販売に関する業務の責任者の氏名", value: tokushoho.representative },
    { label: "住所", value: tokushoho.address },
    { label: "電話番号", value: tokushoho.phone },
    { label: "メールアドレス", value: tokushoho.email },
    { label: "商品の販売価格・サービスの対価", value: tokushoho.price },
    { label: "対価以外に必要となる費用", value: tokushoho.additionalCost },
    { label: "代金の支払時期", value: tokushoho.paymentTiming },
    { label: "支払方法", value: tokushoho.paymentMethod },
    { label: "商品引渡しまたはサービス提供の時期", value: tokushoho.deliveryTiming },
    { label: "返品・キャンセルに関する特約", value: tokushoho.returnPolicy },
  ];
  
  return (
    <div className="container">
      <div className="legal-page">
        <h1>特定商取引法に基づく表示</h1>
        
        <table className="tokushoho-table">
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <th>{item.label}</th>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
