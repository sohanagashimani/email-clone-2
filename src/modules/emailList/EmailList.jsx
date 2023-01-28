import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";
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
import { isInLocalStorage } from "../../@utils";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [showEmailDetails, setShowEmailDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedEmail, emailList, isFetching, isFetchingDetails } =
    useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    let ignore = false;
    if (!isInLocalStorage(currentPage)) {
      if (!ignore) dispatch(fetchEmailList(currentPage));
    }
    return () => {
      ignore = true;
    };
  }, [dispatch, currentPage]);

  const htmlFrom = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString, {
      USE_PROFILES: { html: true },
    });
    const html = parse(cleanHtmlString);
    return html;
  };

  const { filter, handleFilterChange } = useFilter();
  const filteredEmails = useFilteredEmails(
    emailList,
    filter,
    currentPage,
    selectedEmail
  );

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
          <div className="flex items-center mb-2">
            <Header
              {...{
                filter,
                setShowEmailDetails,
                handleFilterChange,
                dispatch,
                setSelectedEmail,
              }}
            />
            <Pagination
              current={currentPage}
              total={filteredEmails?.length}
              disabled={
                filter.showFavorites ||
                filter.showUnreadEmails ||
                filter.showReadEmails
              }
              // showTotal={() => ` ${filteredEmails?.length} items`}
              defaultPageSize={9}
              onChange={(page) => {
                setCurrentPage(page);
                setShowEmailDetails(false);
                dispatch(setSelectedEmail(null));
              }}
              className="ml-auto"
            />
          </div>

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
                    ? "w-2/6 h-[calc(100vh-4rem)] overflow-y-auto pr-6"
                    : "w-full h-full"
                }`}
              >
                {filteredEmails?.map((email) => (
                  <EmailListItem
                    key={email.id}
                    {...{
                      email,
                      setSelectedEmail,
                      dispatch,
                      selectedEmail,
                      showEmailDetails,
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
                  <div className="w-4/6 h-[calc(100vh-4rem)]">
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
