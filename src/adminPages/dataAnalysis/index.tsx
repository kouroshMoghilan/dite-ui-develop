import { BarChartOutlined } from "@ant-design/icons";
import PageTitle from "../../components/template/PageTitle";
import WhiteScreen from "../../components/template/WhiteScreen";
import { LanguageAnalysis } from "./components/LanguageAnalysis";
import { VisitorStatistics } from "./components/VisitorStatistics";
import { useState } from "react";

const dataAnalysis = () => {
  const [filter, setFilter] = useState(
    { 
      exhibitionId: null as number | null,
      createTime: null as string | null
    }
    
    );

  return (
    <>
      <PageTitle title='مشاهده درخواست ها' icon={<BarChartOutlined />} />
      <div className="space-y-5">
        <WhiteScreen>
          <VisitorStatistics 
          filter={filter}
          setFilter={setFilter}
          />
        </WhiteScreen>
        <WhiteScreen>
          <LanguageAnalysis 
          filter={filter}
          setFilter={setFilter}
          />
        </WhiteScreen>
      </div>
    </>
  )
}

export default dataAnalysis;