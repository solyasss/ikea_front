import './NewOptions.css'
import windowImg from '../../assets/img/new_options/kitchen-1.png'
import bedImg from '../../assets/img/new_options/bedroom-1.png'
import familyImg from '../../assets/img/new_options/kitchen-2.png'
import kitchenImg from '../../assets/img/new_options/kitchen-3.png'

function NewOptions () {
    return (
        <div className='new-options-container my-5 '>
            <h1 className='mt-5 mb-3'>НОВИНКИ</h1>

            <div className='row gx-3 gy-3'>

                <div className='col-12 col-lg-5'>
                    <img
                        src={windowImg}
                        className='new-options-img w-100'
                        style={{ height: '275px' }}
                        alt='window scene'
                    />
                </div>

                <div className='col-12 col-lg-7'>
                    <img
                        src={bedImg}
                        className='new-options-img w-100'
                        style={{ height: '275px' }}
                        alt='bedroom lamp'
                    />
                </div>

                <div className='col-12 col-lg-7'>
                    <img
                        src={familyImg}
                        className='new-options-img w-100'
                        style={{ height: '676px' }}
                        alt='family at table'
                    />
                </div>

                <div className='col-12 col-lg-5'>
                    <img
                        src={kitchenImg}
                        className='new-options-img w-100'
                        style={{ height: '676px' }}
                        alt='kitchen shelves'
                    />
                </div>

            </div>
        </div>
    )
}

export default NewOptions
