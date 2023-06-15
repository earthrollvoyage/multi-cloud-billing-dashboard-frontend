import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Close, CloseOutlined } from "@material-ui/icons";
import styled from "styled-components";
import Playground from "../../../formInput/aotocomplete/playground/dashboard/aws";
import CalendarsDateRangePicker from "../../../picker/daily";
import RadioButtonsGroupBy from "../../../formInput/radioButtons/dashboard/aws/groupBy";
import RadioButtonsGranularity from "../../../formInput/radioButtons/dashboard/aws/granularity";
import { AzureFilterDataContext } from "../../../../data/dashboardFilter/azure/filterDataContext";
import ChartTypeDropdown from "../../../formInput/dropdown/dashboard/chartType";
import GranularityDropdown from "../../../formInput/dropdown/dashboard/granularity";
import GroupByDropdown from "../../../formInput/dropdown/dashboard/groupBy";
import FilterByDropdown from "../../../formInput/dropdown/dashboard/filterBy";
import SubmitButtonComponent from "../../../formInput/button/submit";
// import 'rsuite/dist/styles/rsuite-default.css';

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
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
  justify-content: flex-end;
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

const AzureFilterComponent = () => {
  const { azureFilterDataSet, handleChangeAzureFilter } = useContext(AzureFilterDataContext);
  const [ dateRange, setDateRange ] = useState([azureFilterDataSet.dateRange.startDate, azureFilterDataSet.dateRange.endDate]);
  const [ granularity, setGranularity ] = useState(azureFilterDataSet.granularity);
  const [ groupBy, setGroupBy ] = useState(azureFilterDataSet.groupBy);
  const [ listSelectBy, setListSelectBy ] = useState(azureFilterDataSet.listSelectBy);

  const handleOnChangeDate = (value) => {
    setDateRange({startDate: value[0], endDate: value[1]});
  }

  const handleOnChangeGranularity = (value) => {
    setGranularity(value);
  }

  const handleOnChangeGroupBy = (value) => {
    setGroupBy(value);
    setListSelectBy([]);
  }

  const handleOnChangeSelectBy = (value) => {
    setListSelectBy(value);
  }

  const handleOnClick = () => {
    let startDate = Array.isArray(dateRange) ? dateRange[0] : dateRange.startDate;
    let endDate = Array.isArray(dateRange) ? dateRange[1] : dateRange.endDate;

    const dataFilter = {
      dateRange: { startDate: startDate, endDate: endDate },
      granularity: granularity,
      groupBy: groupBy,
      listSelectBy: listSelectBy
    }

    handleChangeAzureFilter(dataFilter);
  }

  return (
    <FilterContainer>
        <FilterWrap>
            <FilterTopInputWrap>
                <FilterTopInputLeftWrap>
                    <FilterTopInputLeftItemWrap>
                        <CalendarsDateRangePicker dateRange={dateRange} handleOnChange={handleOnChangeDate} />
                    </FilterTopInputLeftItemWrap>
                    <FilterTopInputLeftItemWrap>
                        < GranularityDropdown granularity={granularity} handleOnChange={handleOnChangeGranularity} />
                    </FilterTopInputLeftItemWrap>
                </FilterTopInputLeftWrap>
                <FilterTopInputRightWrap>
                    <FilterTopInputRightItemWrap>
                        <ChartTypeDropdown />
                    </FilterTopInputRightItemWrap>
                </FilterTopInputRightWrap>
            </FilterTopInputWrap>
            <FilterBottomInputWrap>
                <FilterBottomInputItemWrap width="45%" borderFlag={false}>
                    <FilterBottomInputItemLeftInnerWrap>
                        Group by:
                    </FilterBottomInputItemLeftInnerWrap>
                    <FilterBottomInputItemRightInnerWrap>
                        < GroupByDropdown cloudBrand="azure" groupBy={groupBy} handleOnChange={handleOnChangeGroupBy} />
                    </FilterBottomInputItemRightInnerWrap>
                </FilterBottomInputItemWrap>
                <FilterBottomInputItemWrap width="100%" margin="5px" borderFlag={true}>
                  <FilterBottomInputItemContentWrap flexPosition="flex-start" marginLeft="5px">
                    <FilterByDropdown cloudBrand="azure" listSelectBy={listSelectBy} handleOnChange={handleOnChangeSelectBy} groupBy={groupBy} />
                  </FilterBottomInputItemContentWrap>
                  <FilterBottomInputItemContentWrap flexPosition="flex-end" marginRight="10px">
                    <SubmitButtonComponent title="APPLY" submit={ handleOnClick } backgroundColor="unset" />
                  </FilterBottomInputItemContentWrap>
                </FilterBottomInputItemWrap>
            </FilterBottomInputWrap>
        </FilterWrap>
    </FilterContainer>
  );
};

export default AzureFilterComponent;
