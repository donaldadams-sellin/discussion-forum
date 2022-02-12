import TopicComponent from '../../components/TopicComponent/TopicComponent';

export default function TopicListPage({topics}) {
    

    return (
        <>
            <h3>Browse to a topic to see what people are discussing!</h3>
            {topics.map((topic, idx, topics)=><TopicComponent key={idx} idx={idx} topic={topic} last={topics.length -1} />)}
        </>
        
    )
}