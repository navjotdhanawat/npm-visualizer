//style.js
const style = {
    menuStyle: {
        width: '100%!important'
    },
    noProject:{
        textAlign: 'center',
        padding: '20px',
        margin: '20px',
        marginLeft: '0px'
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.73)',
        width: '100%',
        height: '100vh',
        zIndex: '999'
    },
    loader: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        zIndex: '9999'
    },
    body: {
        margin: '0px',
        fontFamily: 'Roboto'
    },
    FloatBtnStyle: {
        position: 'relative',
        left: '15px',
        top: '-5px'

    },
    todoBoard: {
        margin: '20px',
        paddingTop: '20px'
    },
    leftPanel: {
        margin: '20px'
    },
    pkgTable: {
        margin: '20px',
        paddingTop: '20px',
        marginLeft: '0px'
    },
    todoTable: {
        width:'80vw',
        margin:'5px 0px 5px 20px',
        fontFamily:'Helvetica, sans-serif'
    },
    title: {
        marginLeft: '50px',
        textAlign:'left',
        textTransform:'uppercase'
    },
    todoList: {
        border:'1px solid #f1f1f1',
        padding:'0 12px',
        maxHeight:'70vh',
        overflow:'scroll'
    },
    todo: {
        backgroundColor:'#fafafa',
        margin:'10px',
        padding:'3px 10px',
        fontSize:'.85rem'
    },
    todoForm: {
        marginTop: '50px',
        marginLeft:'50px',
        paddingBottom: '50px',
        justifyContent:'space-between'
    },
    TodoContainer: {
        marginTop: '50px',
        marginLeft:'50px',
        paddingBottom: '50px',
        justifyContent:'space-between'
    },
    todoFormTitle: {
        minWidth:'150px',
        margin:'3px',
        padding:'0 10px',
        borderRadius:'3px',
        height:'40px',
        flex:'2'
    },
    todoFormTextField: {
        marginLeft:' 25px',
        minWidth:'380px',
        fontFamily: 'Indie Flower',
        fontSize: '1.5em'
    },
    todoFormButton: {
        marginLeft:'15px'
    },
    packageText: {
        width: '200px'
    },
    todoFormCompleted: {
        margin:'3px',
        padding:'0 10px',
        height:'40px',
        flex:'2'
    },
    todoFormPost: {
        minWidth:'75px',
        flex:'1',
        height:'40px',
        margin:'5px 3px',
        fontSize:'1rem',
        backgroundColor:'#A3CDFD',
        borderRadius:'3px',
        color:'#fff',
        textTransform:'uppercase',
        letterSpacing:'.055rem',
        border:'none'
    },
    deleteLink: {
        color: '#777',
        fontSize:'8px'
    },
    updateLink: {
        color: '#777',
        fontSize:'8px'
    },
    toDoStyle: {
        fontFamily: 'Indie Flower',
        fontSize: '2em',
        color: '#00BCD4',
        marginLeft: '10px',
        marginTop: '-10px',
        textDecoration: 'none'
    },
    completedToDoStyle: {
        fontFamily: 'Indie Flower',
        fontSize: '2em',
        color: '#00BCD4',
        marginLeft: '10px',
        marginTop: '-10px',
        textDecoration: 'line-through'
    },
    completedStyle: {
        color: '#777',
        textAlign: 'left'
    },
    exampleEnter: {
        opacity: "0.01"
    },
    exampleEnterActive: {
        opacity: '1',
        transition: 'opacity 500ms ease-in'
    },
    exampleLeave: {
        opacity: '1'
    },
    exampleLeaveActive: {
        opacity: '0.01',
        transition: 'opacity 300ms ease-in'
    }
}
module.exports = style;