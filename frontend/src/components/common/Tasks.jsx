import { POSTS } from "../../utils/db/dummy";
import Task from "./Task";

const Tasks = () => {
  const isLoading = false;
  return (
    <>
      {/* {isLoading && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)} */}
      {!isLoading && POSTS?.length === 0 && (
        <p className="text-center my-4">No Tasks</p>
      )}
      {!isLoading && POSTS && (
        <div className="flex flex-wrap justify-evenly gap-4 mt-8">
          {POSTS.map((post) => (
            <Task key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default Tasks;
