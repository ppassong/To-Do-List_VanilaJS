const todoInputElem = document.querySelector('.todo-input');
//입력되는 input 요소를 가져오기 위한 것
const todolistElem = document.querySelector('.todo-list');
//.todo-list클래스 네임을 가진 ul요소를 전체활용하기 위해 전역선언
const completeAllbuttonElem = document.querySelector('.complete-all-button');
//전체 완료 처리를 위해 만든 전체 완료 체크 버튼 전역선언

// 남은 할 일 개수 표시하는 함수 ------------------------------------
const leftitemsElem = document.querySelector('.left-items');

// 하단의 각각의 버튼의 이벤트 리스너로 기능 부여하기 ------------------------
const showAllbuttonElem = document.querySelector('.show-all-button');
const showActivebuttonElem = document.querySelector('.show-active-button');
const showCompletedbuttonElem = document.querySelector('.show-completed-button');
const clearCompletedbuttonElem = document.querySelector('.clear-completed-button');
//각각의 버튼요소들 클래스명으로 쿼리 셀렉터로 가져와서 변수로 설정하여 활용



let id = 0;
const setId = (newId) => {id = newId};
//각각의 할 일들이 유니크하게 구별 할 수있는 키값 설정하기 위해 0으로 선언


let isAllCompleted = false;
//전체 todos 체크 여부 변수선언
const setisAllCompleted = (bool) => { isAllCompleted = bool };
//불리언 자료타입으로 변수 설정

let currentShowType = 'all';
const setCurrentShowType = (newShowType) => currentShowType = newShowType
//새롭게 설정되는 타입은 현재의 타입으로 바로 반영하는 변수 설정


let todos= [];
const setTodos = (newTodos) => {
    todos = newTodos;
}
//새롭게 저장되는 newtodos는 기존 todos리스트와 같다


const getAllTodos = () => {
    return todos;
}


//전체 todos의 체크여부 확인 (isCompleted를 확인하여)
const getCompletedTodos = () => {
    return todos.filter(todo => todo.isCompleted === true );
}
//isCompleted true 상태를 필터링 하여 밖에서 사용 할 수 있게 리턴


// 현재 완료되지 않은 할 일 리스트 반환하는 함수
const getActiveTodos = () => {
    return todos.filter(todo => todo.isCompleted === false);
    //완료되지 않은 todo.id 필터해서 리턴
}


const setLeftitems = () => {
    const leftTodos = getActiveTodos()
    leftitemsElem.innerHTML = `${leftTodos.length} items left`
}   
//남은 할 일 개수를 표시 및 갱신해주는 함수
//템플릿 리터럴 백틱사용` 으로 변수 값 텍스트로 반영 저장




//todos 의 전체 완료 처리들 위한 함수들------------------------------------

// 전체완료 처리를 위한 함수설정
const completeAll = () => {
    completeAllbuttonElem.classList.add('checked');
    //css로 체크표시 스타일링 부여
    const newTodos = getAllTodos().map(todo => ({...todo, isCompleted: true}));
    //map배열로 isCompleted true 상태로 토글하여 집어넣기
    setTodos(newTodos)
    //다시 기존 Todos로 셋팅해주기
}

// 전체완료 처리 해제를 위한 함수설정
const incompleteAll = () => {
    completeAllbuttonElem.classList.remove('checked');
    const newTodos = getAllTodos().map(todo => ({...todo, isCompleted: false}));
    setTodos(newTodos)
}


//전체 todo의 완료 상태를 파악하여 전체 완료 처리 버튼에 css를 반영
const checkisAllCompleted = () => {
    if (getAllTodos().length === getCompletedTodos().length) {
        setisAllCompleted(true);
        completeAllbuttonElem.classList.add('checked');
        //완료처리로 필터된 배열의 항목과 기존 입력된 배열의 항목 갯수가 같다면 isCompleted true 처리하고 checkd 클래스 묘시
    } else {
        setisAllCompleted(false);
        completeAllbuttonElem.classList.remove('checked');
        //아니면 flase 값 설정. checked 표시 제거하기.
    }
}


// isAllcompleted 상태를 토글시켜주는 함수설정
// 기존 todos 배열의 isCompleted를 바꿔주는 isAllChecked (전체 체크여부)상태에 맞춰서 바꿔줌.
const onClickCompleteAll = () => {
    if(!getAllTodos().length) return;
    //todos  배열의 길이가 0아닐ㄸㅐ 리턴하고
    if(isAllCompleted) 
    // isAllCompleted 가 true 이면
    incompleteAll();
    // true 값: incomleteAll함수 호출.(미완료처리 map배열 isCompleted: false)

    else // false 값 설정들
    completeAll();
    // todo를 전체완료 처리 isCompleted: true )
    setisAllCompleted(!isAllCompleted);
    // 전체 todo체크 설정 true로 토글 처리 (isAllcompleted 기본 설정 false)
    paintTodos();
    setLeftitems()
}
//------------------------------------------------------------------------




// todos 이전 배열함수를 리턴으로 가져오는 함수------------------------------------
const appendTodos = (text) => {
    const newId = id + 1; 
    setId(newId);
// id는 1씩 증가시켜 id값이 중복되지 않게
//setId로 id 값 갱신
    const newTodos = getAllTodos().concat({id: newId, isCompleted: false, content: text})
    setTodos(newTodos)
    setLeftitems()
    checkisAllCompleted(); // 전체완료 확인
    paintTodos();
}
// 이전 todos배열을 가져온 후 새롭게 추가된 배열을 concat을 통해 newtodos에 저장한 후 기존 todos 배열에 리턴
//concat()은 기존 todos배열에 영향을 주지 않고 합친 배열을 새로운 배열로 반환
// id는 newid 새로운 id값 추가, iscomplete는 완료상태로 불리언 타입. content는 text로 할 일의 내용
//이렇게 추가된 새배열 newTodos를  setTodos라는 함수를 실행하여 기존 todos배열 함수로 변경 newTodos=todos;





//todolist에서 할 일을 삭제하는 함수------------------------------------
const deleteTodo = (todoId) => {
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId);
    setTodos(newTodos);
    setLeftitems()
    paintTodos()
    //입력받은 todo.id값과 해당 todo.id값이 일치하지 않는 것을 Array.filter를 통해 필터하여 삭제
    //그리고 다시 setTodos함수로 삭제된 것이 반영된 배열 함수를 다시 기존 todos배열로 셋팅. paintTodos로 삭제된 배열의 형태로 다시 HTMl로 다시 렌더링
    //위 과정이 빠지면 재입력할 때. 삭제된 것이 반영이 안되어 리셋이 일어남
}



//todolist에서 할 일을 완료하는 함수------------------------------------
const completeTodo = (todoId) => {
    const newTodos = getAllTodos().map(todo => 
        todo.id === todoId ? 
        //조건문 삼항연산자
        {...todo, isCompleted: !todo.isCompleted} 
        // true 값 isCompleted 토글 처리
        // isCompleted 기본값 설정 false. true로 전환 (!부정으로 반대로 전환)
        : todo);
        // false 값
        // 그냥 그대로 반영
        
        setTodos(newTodos);
        paintTodos();
    //삭제 함수와 동일하나, Array.map을 이용해 완료처리를 하고자 하는 할 일의 isCompleted 토글 값을 반영처리하여 새로운 todos배열로 저장
    //이후 paintodos()함수를 통해 변경된 todos를 재 렌더링
    
    setLeftitems()
    checkisAllCompleted();
    //전체 todo의 완료 상태를 파악하여 전체 완료 처리 버튼에 css를 반영
}   



//할 일을 수정해주는 updateTodo() 함수------------------------------------
const updateTodo = (text, todoId) => {
    const currentTodos = getAllTodos();
    const newTodos = currentTodos.map(todo => 
        todo.id === todoId ?
        //map을 통해 id값을 조건비교하여 일의 내용을 수정하는 새로운 배열 생성
        ({...todo, content: text})
        //true 값
        //{ }새 객체를 생성. ...은 복사병합 하는 스프레드 연산자. todo의 모든 속성을 복사. content 변수 값으로 text로 속성을 업데이트
        : todo);
        //false 값
        //일치하는 항목이 없으면 개체를 변경하지 않고 그대로 반환함
    setTodos(newTodos);
    //새로운 todos배열을 다시 저장
    paintTodos();
    //변경된 todos 배열을 다시 할 일 리스트로 렌더링
}



//더블클릭 시 수정 모드로 전환하는 함수
const onDbclickTodo = (e, todoId) => {
    const todoElem = e.target;
    const inputText = e.target.innerText;
    const todoitemElem = todoElem.parentNode;
    const inputElem = document.createElement('input');
    inputElem.value = inputText;
    inputElem.classList.add('edit-input');
    //css에서 position:absolute로 정의해ㅔ 수정하고자 하는 todoitemElem영역을 완전히 가리도록 스타일링
    inputElem.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            updateTodo(e.target.value, todoId);
            document.body.removeEventListener('click', onClickBody);
            //수정 칸을 제외한 다른 곳을 클릭하면 수정모드 종료하는 절차 만들기
        }
    })

    const onClickBody = (e) => { //event 객체를 인자로 받으며
        if(e.target !== inputElem) {
            //evnet 값이 수정모드를 위해 생성한 inputElem이 아니라면
            todoitemElem.removeChild(inputElem);
            //inputElem의 부모요소인 todoElem의 에서 inputElem을 제거
            document.body.removeEventListener('click', onClickBody);
            //body에 등록된 클릭 이벤트 제거
            //결과적으로 body 부분 클릭시 수정모드 종료()
                }
            }

            document.body.addEventListener('click', onClickBody)
            //body 부분 클릭에 대한 이벤트 리스너 등록
            todoitemElem.appendChild(inputElem);
}



// 완료된 목록 지우기 clearCompletedTodos() 구현------------------------
const clearCompletedTodos = () => {
    const newTodos = getActiveTodos()
    setTodos(newTodos)
    paintTodos();
    //todo 배열을 완료되지 않은 activetodos로 변경해준 후 재 렌더링
}




//todolist에 새로 할 일을 추가하는 함수------------------------------------
const paintTodo = (todo) => {
    const todoitemElem = document.createElement('li');
    todoitemElem.classList.add('todo-item');

    todoitemElem.setAttribute('data-id', todo.id);

    const checkboxElem = document.createElement('div');
    checkboxElem.classList.add('checkbox');
    checkboxElem.addEventListener('click', () => completeTodo(todo.id))
    //click 이벤트로 완료 버튼을 클릭하면 completeTodo함수 실행. 인자로 todo.id값을 받음

    const todoElem = document.createElement('div');
    todoElem.classList.add('todo');
    todoElem.addEventListener('dblclick', (event) => onDbclickTodo(event, todo.id))
    //todoElem 이 만들어질 때, 더블클릭 이벤트가 발생하면 콜백함수로 onDbclickTodo() 함수가 호출되게 설정
    todoElem.innerText = todo.content;
    //입력하는 todo.content: text 값으로 innetText 교체. div태그로 감싸고 todo 클래스 부여
    

    const deletebuttonElem = document.createElement('button');
    deletebuttonElem.classList.add('delete-button');
    deletebuttonElem.addEventListener('click', () => deleteTodo(todo.id))
    //click 이벤트로 삭제 버튼을 클릭하면 deletTodo함수 실행. 인자로 todo.id값을 받음
    deletebuttonElem.innerHTML = 'x';
    //todo-item에 해당하는 부분 반복문으로 li태그와 div태그로 checkbox와 deletebutton 클래스를 적용하여 css 추가해주기

    if(todo.isCompleted) {
        todoitemElem.classList.add('checked');
        checkboxElem.innerText = '✔';
    }

    todoitemElem.appendChild(checkboxElem);
    todoitemElem.appendChild(todoElem);
    todoitemElem.appendChild(deletebuttonElem);

    todolistElem.appendChild(todoitemElem);
    //위에 설정한 설정으로 iscompleted의 속성을 이용하여 만약 true 완료된 항목일 경우
    //todo-list에 기존 요소 그대로 넣는데 checked 클래스 네임으로 바꾸어 체크표시 css륿 반영

}



// 기존의 paintTodos함수는 currentShowType에 따라 렌더링이 돠지 않기에
// switch-case 문을 사옹해 currenShowType에 따라 렌더링 할 수 있게 함수 설정
const paintTodos = () => {
todolistElem.innerHTML = '';
 //todoListElem 요소 안의 HTMl 초기화. 초기화 하지 않으면 painTodos가 실행 될 때마다 기존의 HTML과 중복

switch (currentShowType) {
    case 'all':
        const allTodos = getAllTodos();
        allTodos.forEach(todo => { paintTodo(todo); });
        break;

    case 'active':
        const activeTodos = getActiveTodos();
        activeTodos.forEach(todo => { paintTodo(todo); });
        break;

    case 'completed':
        const completedTodos = getCompletedTodos();
        completedTodos.forEach(todo => { paintTodo(todo); });
        break;

    default:
        break;
}
}



// 완료목록 지우기 clear-Completed 버튼 함수 설정 ---------------------------------------

// 클릭된 todos의 타입에 따라 할 일 목록들을 보여줌.
const onClickShowTodosType = (e) => {

    const currentbuttonElem = e.target;
    const newShowType = currentbuttonElem.dataset.type;
    //현재 이벤트 클릭된 버튼 타겟 요소 currnetbuttonElem의 dataset을 사용해 type을 가져오기.
    // html의 버튼 클래스에 부여한 data-type

    if ( currentShowType === newShowType ) return;

    const prebuttonElem = document.querySelector(`.show-${currentShowType}-button`);
    //자바스크립트 ${변수} 타입 처리 `백틱. 따음표' 아님!
    prebuttonElem.classList.remove('selected');
    //이전에 html에 명시된 showtype 버튼에 햔재 명시된 current type 버튼으로 클래스를 주고 selected 클래스를 지워주기

    currentbuttonElem.classList.add('selected')
    setCurrentShowType(newShowType)
    //새롭게 들어온 showtype에 selected 클래스 추가. 현재 타입을 새 타입으로 설정

    paintTodos();
    // 기존의 배열로 다시 투두리스트 재렌더링
}





//todos의 배열의 길이와 완료상태가 변할 때마다 호출되는 init함수 ------------------------------------

//todolist에서 입력하는 이벤트발생: 입력 칸에 입력하고고 엔터하는 순간 value값을 보내주고 다시 빈칸으로 초기화 시키는 함수
const init = () => {
    todoInputElem.addEventListener('keypress', (e) => {
        if( e.key === 'Enter') {
            appendTodos(e.target.value); todoInputElem.value='';
        }
    })
    //할일 추가 하기 위해 input요소로 부터 이벤트 리스너 등록. 이벤트 캐치 후. 입력받은 데이터 배열에 순차적으로 담기
    //이벤트 리스너란? dom객체에서 이벤트가 발생 할 경우 해당 이벤트 처리 핸들러를 추가할 수 있는 특정함수 호출
    // e값을 부여하는데 그것이 enter 키라면. if.
    /// 눌렀을 때 appendTodos 함수에 입력 값 target.value 넘겨주고. 기존 함수 todoInputElem은 빈 값으로 '' 초기화

    completeAllbuttonElem.addEventListener('click', onClickCompleteAll);
    //전체 완료 처리 버튼에 클릭 이벤트. onClickCompleteAll() 콜백함수 호출
    showAllbuttonElem.addEventListener('click', onClickShowTodosType);
    showActivebuttonElem.addEventListener('click', onClickShowTodosType);
    showCompletedbuttonElem.addEventListener('click', onClickShowTodosType);
    clearCompletedbuttonElem.addEventListener('click', clearCompletedTodos);
    //각 버튼 들에 해당 함수를 호출하는 이벤트 리스너들 등록
    
    setLeftitems()
    //남은 할 일 개수 표시
}

init()




