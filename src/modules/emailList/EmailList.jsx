import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import parse from "html-react-parser";
import DOMPurify from "dompurify";
import {
  fetchEmailList,
  setSelectedEmail,
  toggleFavoriteEmail,
} from "./emailList.actions";
import { Spinner, When } from "../../@components";
import { EmailDetails, EmailListItem, Header } from "./components";
import { useFilter, useFilteredEmails } from "../../@hooks";
import { Empty } from "antd";
import { isEmpty } from "ramda";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [showEmailDetails, setShowEmailDetails] = useState(false);
  const { selectedEmail, emailList, isFetching, isFetchingDetails } =
    useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmailList());
  }, [dispatch]);

  const htmlFrom = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString, {
      USE_PROFILES: { html: true },
    });
    const html = parse(cleanHtmlString);
    return html;
  };

  const { filter, handleFilterChange } = useFilter();
  const filteredEmails = useFilteredEmails(emailList, filter);

  return (
    <>
      <When isTrue={isFetching}>
        <div className="h-screen w-screen flex flex-row items-center justify-center">
          <div className="flex flex-col">
            <Spinner spinning={isFetching} />
          </div>
        </div>
      </When>
      <When isTrue={!isFetching}>
        <div className="flex flex-col px-6 py-4 h-screen">
          <Header
            {...{
              filter,
              setShowEmailDetails,
              handleFilterChange,
              dispatch,
              setSelectedEmail,
            }}
          />
          <When isTrue={isEmpty(filteredEmails)}>
            <div className="flex items-center justify-center h-full">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          </When>
          <When isTrue={!isEmpty(filteredEmails)}>
            <div className="flex text-[#636363]">
              <div
                className={`${
                  showEmailDetails
                    ? "w-2/6 h-screen overflow-y-scroll pr-6"
                    : "w-full h-full"
                } 
               `}
              >
                {filteredEmails?.map((email) => (
                  <EmailListItem
                    {...{
                      email,
                      setSelectedEmail,
                      dispatch,
                      selectedEmail,
                      setShowEmailDetails,
                      filter,
                    }}
                  />
                ))}
              </div>
              <When isTrue={showEmailDetails}>
                <When isTrue={isFetchingDetails}>
                  <div className="w-4/6 flex items-center justify-center">
                    <div className="flex flex-col">
                      <Spinner spinning={isFetchingDetails} size={30} />
                    </div>
                  </div>
                </When>
                <When isTrue={!isFetchingDetails}>
                  <div className="w-4/6 h-max">
                    <EmailDetails
                      {...{
                        selectedEmail,
                        htmlFrom,
                        setShowEmailDetails,
                        filter,
                        showEmailDetails,
                        toggleFavoriteEmail,
                        dispatch,
                        isFetchingDetails,
                      }}
                    />
                  </div>
                </When>
              </When>
            </div>
          </When>
        </div>
      </When>
    </>
  );
};
