import { Component } from 'react';
import { CallumAPI } from '../Api/api'
import { Link } from 'react-router-dom';
import EditPageComponent from './edit-page';

export default class SearchPageComponent extends Component {

    state = {
        isLoading: true,
        celebrities: [],
        isDeleting: false
    }

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.getArtists();
    }

    getArtists() {
        CallumAPI.all().then(celebrities => {

            this.setState({ celebrities, isLoading: false });
        });

    }

    onDelete = (id) => {
        this.setState({ isDeleting: true });
        const { celebrities } = this.state;
        if (window.confirm('Are You sure you want to delete?')) {
            CallumAPI.deleteCelebrity(id).then(celebs => {
                this.setState({ celebrities: celebrities.filter(celebrity => celebrity.id !== id), isDeleting: false });
            }).catch(err => { this.setState({ isLoading: false, isDeleting: false }) });
        }

    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        const { isLoading, celebrities, isDeleting } = this.state;
        return (
            <div>
                <div>
                    {isDeleting ? (
                        <div className="deleting">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Deleting...</span>
                            </div>
                        </div>
                    ) : ''}
                </div>
                <div className="mr-3 d-flex justify-content-end mt-3 mb-3">
                    <a href="/create/celebrity" className="btn btn-primary">Add Celebrity</a>
                </div>
                <div className="row mr-3 ml-3 justify-content-around">
                    {!isLoading ? (
                        celebrities.map(celebrity => {
                            return <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                                <div className="card custom-card shadow-sm border-0 rounded">
                                    <div className="card-body p-0"><img src={`https://myappprofile1440.herokuapp.com/user-photos/${celebrity.id}/${celebrity.photos}`} alt="" className="w-100 card-img-top" />
                                        <div className="p-4">
                                            <Link to={`/${celebrity.id}`} className="text-dark card-title">{celebrity.firstName + ' ' + celebrity.lastName}</Link>
                                            <p className="small text-muted">{celebrity.address} - {celebrity.age}</p>
                                        </div>
                                        <div className="d-flex justify-content-around">
                                            <div data-toggle="modal" data-target="#exampleModalCenter" className="small search-icon mb-0"><i className="fas fa-edit"></i></div>
                                            <div className="search-icon" onClick={() => this.onDelete(celebrity.id)}><i className="fas fa-trash-alt"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <EditPageComponent celebrity={celebrity} />
                                </div>
                            </div>
                        })

                    ) : (
                            <div className="d-flex justify-content-center" >
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>

                        )}
                </div>
            </div >
        )
    }
}

