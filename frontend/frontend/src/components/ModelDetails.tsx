import { Model } from './interfaces';

const ModelDetails = (props: { post: Model }) => {
  function decodeHtml(html: any) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <section className='model-info'>
      <img className='model-img' src={props.post.imgLink} alt='Alt' />
      <div className='divider-line'></div>
      <section className='model-description'>
        <h1>{props.post.title}</h1>
        <h2>{props.post.shaper}</h2>
        {decodeHtml(props.post.description).length < 300 ? (
          <p>{decodeHtml(props.post.description)}</p>
        ) : (
          <details>
            <summary>See board details</summary>
            <p>{decodeHtml(props.post.description)}</p>
          </details>
        )}
      </section>
    </section>
  );
};

export default ModelDetails;
