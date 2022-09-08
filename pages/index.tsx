import { Space, Spin } from "antd";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { MEDIUM_DARK_BLUE } from "../styles/Colours";

const SuspenseApp = dynamic(
  () => import("../Components/App"),
  { suspense: true }
);

const LoadingScreen = () => {

  return (
    <div
      style={{
        height:'100vh',
        width:'100vw',
        background: MEDIUM_DARK_BLUE
      }}
    > 
      <Spin 
        size="large"
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: '45vh'
        }}
      />        
    </div>
  )
}

export default function Home() {

  return (
    <Suspense fallback={<LoadingScreen/>}>
      <SuspenseApp/>
    </Suspense>
  )

}
