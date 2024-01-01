import React from 'react';
import { Select, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { setTextFont } from '../redux/actions/ProductActions';

const FontSelect = () => {

    //redux part
    const dispatch = useDispatch();
    const handleChange = (value) => {
        switch (value) {
            case "Roboto":
                dispatch(setTextFont("'Roboto', sans-serif"))
                break;
            case "Poppins":
                dispatch(setTextFont("'Poppins', sans-serif"))
                break;
            case "Lato":
                dispatch(setTextFont("'Lato', sans-serif"))
                break;
            case "Open Sans":
                dispatch(setTextFont("'Open Sans', sans-serif"))
                break;

            default:
                break;
        }
    };
    return (
        <Space wrap>
            <Select
                defaultValue="Roboto"
                style={{
                    width: 120,
                }}
                onChange={handleChange}
                options={[
                    {
                        value: 'Roboto',
                        label: 'Roboto',
                    },
                    {
                        value: 'Poppins',
                        label: 'Poppins',
                    },
                    {
                        value: 'Lato',
                        label: 'Lato',
                    },
                    {
                        value: 'Open Sans',
                        label: 'Open Sans',
                    },

                ]}
            />


        </Space>
    )
}

export default FontSelect