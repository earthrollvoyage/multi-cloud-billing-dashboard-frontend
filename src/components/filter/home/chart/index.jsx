import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Close, CloseOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { HomeFilterDataContext } from "../../../../data/homeFilterContext";
import CloudBrandDropdown from "../../../formInput/dropdown/home/cloudBrand";
import ChartTypeDropdown from "../../../formInput/dropdown/home/chartType";
// import 'rsuite/dist/styles/rsuite-default.css';

const FilterContainer = styled.div`
  display: flex;
  /* width: 100%; */
`;

const FilterWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const FilterTopInputWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: row;
`;

const FilterTopInputLeftWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const FilterTopInputLeftItemWrap = styled.div`
  align-items: center;
`;

const FilterTopInputRightWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  /* justify-content: flex-end; */
`;

const FilterTopInputRightItemWrap = styled.div`
  align-items: center;
`;

const FilterBottomInputWrap = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  align-items: center;
  justify-content: row;
  /* background-color: rgb(244,244,244); */
  /* border: 2px solid rgb(244,244,244); */
  
  /* border: 2px solid rgb(244,244,244); */
`;

const FilterBottomInputItemWrap = styled.div`
  display: flex;
  width: ${({ width }) => width ? width : "unset" };
  border-left: ${({ borderFlag }) => borderFlag ?  "2px solid #ffffff" : "unset" };
  margin-left: ${({ margin }) => margin ? margin : "unset" };
  align-items: center;
  padding-top: 3px;
  padding-bottom: 3px;
  border: 1px solid rgb(244,244,244);
  background-color: rgba(236,236,236, 0.2);
`;

const FilterBottomInputItemContentWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ flexPosition }) => flexPosition ? flexPosition : "unset" };
  margin-left: ${({ marginLeft }) => marginLeft ? marginLeft : "unset" };
  margin-right: ${({ marginRight }) => marginRight ? marginRight : "unset" };
  /* background-color: rgba(236,236,236, 0.2); */
`;

const FilterBottomInputItemLeftInnerWrap = styled.div`
  display: flex;
  color: rgb(52, 52, 52);
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  font-family: "Inter";
  font-weight: bold;
  font-size: 15px;
`;

const FilterBottomInputItemRightInnerWrap = styled.div`
  display: flex;
  align-items: center;
  /* margin-top: 10px; */
`;

const HomeChartFilterComponent = () => {
  const { homeFilterDataSet, handleChangeHomeFilter } = useContext(HomeFilterDataContext);
  const [ cloudBrand, setCloudBrand ] = useState(homeFilterDataSet.cloudBrand);

  const handleOnChangeCloudBrand = (value) => {
    setCloudBrand(value);

    const dataFilter = {
      cloudBrand: value,
      monthRange: homeFilterDataSet.monthRange
    }

    handleChangeHomeFilter(dataFilter);
  }

  return (
    <FilterContainer>
        <FilterWrap>
            <FilterTopInputWrap>
                <FilterTopInputLeftWrap>
                    {/* <FilterTopInputLeftItemWrap>
                        <CalendarsMonthRangePicker dateRange={monthRange} handleOnChange={handleOnChangeMonth} />
                    </FilterTopInputLeftItemWrap> */}
                    <FilterTopInputLeftItemWrap>
                        <CloudBrandDropdown cloudBrand={cloudBrand} handleOnChange={handleOnChangeCloudBrand} />
                    </FilterTopInputLeftItemWrap>
                    <FilterTopInputLeftItemWrap>
                        < ChartTypeDropdown />
                    </FilterTopInputLeftItemWrap>
                </FilterTopInputLeftWrap>
            </FilterTopInputWrap>
        </FilterWrap>
    </FilterContainer>
  );
};

export default HomeChartFilterComponent;
