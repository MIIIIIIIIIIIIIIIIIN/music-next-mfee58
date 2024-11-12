import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./message.module.css";

const CommentItem = () => {
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const itemsPerPage = 5;

  // 表單狀態
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const isCurrentUser = (memberId) => {
    return currentEditId === memberId;
  };

  const organizeByFloor = (messages) => {
    const sortedMessages = [...messages].sort(
      (a, b) => a.f_message_floor - b.f_message_floor
    );

    const floorGroups = {};

    sortedMessages.forEach((message) => {
      const floor = message.f_message_floor;
      if (!floorGroups[floor]) {
        floorGroups[floor] = {
          userMessage: null,
          sellerResponse: null,
        };
      }

      if (message.f_sale === 1) {
        floorGroups[floor].sellerResponse = message;
      } else {
        floorGroups[floor].userMessage = message;
      }
    });

    return Object.entries(floorGroups).sort(
      ([floorA], [floorB]) => Number(floorA) - Number(floorB)
    );
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!router.isReady) return;

        const { project } = router.query;
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:3005/fundraiser/message/${project}`
        );
        const data = await response.json();
        const organizedComments = organizeByFloor(data.rows);
        setComments(organizedComments);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const isCurrentUser = (memberId) => {
      // 檢查留言的會員ID是否與當前登入的會員ID相符
      return parseInt(currentEditId) === parseInt(memberId);
    };

    // 修改 fetchMemberData 函數
    const fetchMemberData = async () => {
      try {
        const response = await fetch("http://localhost:3005/mem-data", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch member data");
        }
        const data = await response.json();
        console.log("API response data:", data);

        if (data.admin?.id) {
          setCurrentEditId(data.admin.id);
        } else {
          console.log("User ID not found");
          setCurrentEditId(null);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setCurrentEditId(null);
      }
    };

    fetchMemberData();
    fetchMessages();
  }, [router.isReady]);

  useEffect(() => {
    console.log("currentEditId updated:", currentEditId);
  }, [currentEditId]);

  // 新增留言
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const { project } = router.query;
      
      console.log('Sending data:', {
        project,
        title: formData.title,
        content: formData.content,
        member_id: currentEditId,
      }); // 添加日誌
  
      const response = await fetch(
        `http://localhost:3005/fundraiser/message/${project}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
            member_id: currentEditId,
          }),
          credentials: "include",
        }
      );
  
      if (response.ok) {
        // 重新獲取留言列表
        const updatedResponse = await fetch(
          `http://localhost:3005/fundraiser/message/${project}`
        );
        const data = await updatedResponse.json();
        const organizedComments = organizeByFloor(data.rows);
        setComments(organizedComments);
        setShowAddForm(false);
        setFormData({ title: "", content: "" });
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // 修改留言
  // 修改留言
  const handleEditComment = async (e) => {
    e.preventDefault();
    try {
      if (!editingMessageId) {
        console.error("No message ID for editing");
        return;
      }

      console.log("Editing message:", editingMessageId);
      console.log("Form data:", formData);

      const response = await fetch(
        `http://localhost:3005/fundraiser/message/${editingMessageId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const { project } = router.query;
        const updatedResponse = await fetch(
          `http://localhost:3005/fundraiser/message/${project}`
        );
        const data = await updatedResponse.json();
        const organizedComments = organizeByFloor(data.rows);
        setComments(organizedComments);
        setShowEditForm(false);
        setEditingMessageId(null);
        setFormData({ title: "", content: "" });
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };
  // 刪除留言
  const handleDeleteComment = async (messageId) => {
    if (window.confirm("確定要刪除這則留言嗎？")) {
      try {
        const response = await fetch(
          `http://localhost:3005/fundraiser/message/${messageId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          const { project } = router.query;
          const updatedResponse = await fetch(
            `http://localhost:3005/fundraiser/message/${project}`
          );
          const data = await updatedResponse.json();
          const organizedComments = organizeByFloor(data.rows);
          setComments(organizedComments);
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  // 表單元件
  const CommentForm = ({ onSubmit, buttonText }) => (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          標題：
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>
          內容：
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className={styles.textarea}
          required
        />
      </div>
      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          {buttonText}
        </button>

        <button
          type="button"
          onClick={() => {
            setShowAddForm(false);
            setShowEditForm(false);
            setEditingMessageId(null);
            setFormData({ title: "", content: "" });
          }}
          className={styles.cancelButton}
        >
          取消
        </button>
      </div>
    </form>
  );

  const FloorMessage = ({ floorNumber, userMessage, sellerResponse }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className={styles.floorContainer}>
        {userMessage && (
          <div className={styles.messageCard}>
            <div className={styles.messageContent}>
              <div className={styles.avatar}>用戶</div>
              <div className={styles.mainContent}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>
                    用戶 {userMessage.f_member_id}
                  </span>
                  <span className={styles.messageTime}>
                    {new Date(userMessage.f_message_current).toLocaleString()}
                  </span>
                  <div className={styles.messageActions}>
                    {isCurrentUser(userMessage.f_member_id) && (
                      <>
                        <button
                          className={styles.editButton}
                          onClick={() => {
                            setFormData({
                              title: userMessage.f_message_title,
                              content: userMessage.f_message_content,
                            });
                            setEditingMessageId(userMessage.f_message_id); // 設置要編輯的留言ID
                            setShowEditForm(true);
                          }}
                        >
                          編輯
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() =>
                            handleDeleteComment(userMessage.f_message_id)
                          }
                        >
                          刪除
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.messageBody}>
                  <h4 className={styles.messageTitle}>
                    {userMessage.f_message_title}
                  </h4>
                  <p className={styles.messageText}>
                    {userMessage.f_message_content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {sellerResponse && (
          <div className={styles.toggleReplies}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.toggleButton}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="mr-1" />
                  收起賣家回覆
                </>
              ) : (
                <>
                  <ChevronDown className="mr-1" />
                  查看賣家回覆
                </>
              )}
            </button>
          </div>
        )}

        {isExpanded && sellerResponse && (
          <div
            className={`${styles.messageCard} ${styles.replyCard} ${styles.sellerResponse}`}
          >
            <div className={styles.messageContent}>
              <div className={styles.avatar}>賣家</div>
              <div className={styles.mainContent}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>
                    <span className={styles.customerService}>【賣家回覆】</span>
                  </span>
                  <span className={styles.messageTime}>
                    {new Date(
                      sellerResponse.f_message_current
                    ).toLocaleString()}
                  </span>
                </div>
                <div className={styles.messageBody}>
                  <h4 className={styles.messageTitle}>
                    {sellerResponse.f_message_title}
                  </h4>
                  <p className={styles.messageText}>
                    {sellerResponse.f_message_content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const totalPages = Math.ceil(comments.length / itemsPerPage);

  const getCurrentPageComments = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return comments.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>載入中...</p>
      </div>
    );
  }

  return (
    <div className={styles.messageContainer}>
      {currentEditId && (
        <button
          className={styles.addCommentButton}
          onClick={() => setShowAddForm(true)}
        >
          新增留言
        </button>
      )}

      {showAddForm && (
        <div className={styles.formContainer}>
          <h3 className={styles.formTitle}>新增留言</h3>
          <CommentForm onSubmit={handleAddComment} buttonText="發布留言" />
        </div>
      )}

      {showEditForm && (
        <div className={styles.formContainer}>
          <h3 className={styles.formTitle}>編輯留言</h3>
          <CommentForm onSubmit={handleEditComment} buttonText="更新留言" />
        </div>
      )}

      {comments.length === 0 ? (
        <div className={styles.emptyContainer}>暫無留言</div>
      ) : (
        <>
          {getCurrentPageComments().map(
            ([floor, { userMessage, sellerResponse }]) => (
              <FloorMessage
                key={floor}
                floorNumber={floor}
                userMessage={userMessage}
                sellerResponse={sellerResponse}
              />
            )
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.pageButton}
              >
                <ChevronLeft size={16} />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`${styles.pageButton} ${
                    currentPage === index + 1 ? styles.activePage : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.pageButton}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentItem;
