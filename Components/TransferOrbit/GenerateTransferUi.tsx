import { Button } from "antd"
import React, { useContext } from "react"
import AppContext from "../../Contexts/AppContext"

const GenreateTransferUi: React.FC = () => {

    const { setGenerateTransferOrbitPanelOpen } = useContext(AppContext)

    return (
        <>
            <div>
                <Button
                    style={{
                        marginTop: '15px',
                        marginLeft: '15px'
                    }}
                    danger
                    onClick={() => setGenerateTransferOrbitPanelOpen(false)}
                >
                    Cancel
                </Button>
            </div>
            <div
                style={{
                    margin:'10px'
                }}
            >
                UI to provide parameters to solve Lamberts Problem is going to live here.
            </div>
        </>
    )
}

export default GenreateTransferUi