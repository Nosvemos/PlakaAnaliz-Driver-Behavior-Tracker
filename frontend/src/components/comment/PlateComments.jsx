import React, { useEffect, useState } from 'react';
import CommentForm from '../forms/CommentForm.jsx';
import Loading from '../common/Loading.jsx';
import { useCommentStore } from '../../store/useCommentStore.js';
import CommentHeader from './CommentHeader.jsx';
import CommentList from './CommentList.jsx';

const PlateComments = ({ plateData }) => {
  const { getComments, comments, isLoading } = useCommentStore();
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    if (plateData && plateData._id) {
      getComments(plateData._id);
    }
  }, [getComments, plateData]);

  const handleSortNewest = () => {
    setSortOrder('newest');
  };

  const handleSortOldest = () => {
    setSortOrder('oldest');
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <CommentHeader
        commentCount={comments.length}
        onSortNewest={handleSortNewest}
        onSortOldest={handleSortOldest}
      />
      <CommentForm plateData={plateData} />
      <CommentList comments={sortedComments} />
    </>
  );
};

export default PlateComments;