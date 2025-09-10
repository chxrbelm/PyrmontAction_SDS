


<script setup>
    import {handleError, onMounted, ref} from 'vue'
    import joinUsService from '../services/joinUsAuthService'
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';



    const stateChosen = ref('Default')
    const stateOptions = ref([
        {text: 'State', value: "Default", placeholder: true},
        {text: 'NSW', value: "NSW", placeholder: false},
        {text: 'SA', value: "SA", placeholder: false},
        {text: 'WA', value: "WA", placeholder: false},
        {text: 'NT', value: "NT", placeholder: false},
        {text: 'QLD', value: "QLD", placeholder: false},
        {text: 'VIC', value: "VIC", placeholder: false},
        {text: 'TAS', value: "TAS", placeholder: false}

    ])

    const signUpError = reactive({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobilePhone: '',
        areaOfInterest: '',
        streetName: '',
        city: '',
        state: '',
        postcode: ''

    })


    const signUpData = ref({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobilePhone: '',
        areaOfInterest: '',
        streetName: '',
        city: '',
        state: '',
        postcode: ''
    })

    const passwordValidator = ref({
        minlength: false,
        uppercase: false,
        lowercase: false,
        number: false,
        symbols: false,
    })

    function passwordCheck(){
        passwordValidator.value.minlength = signUpData.value.password.length >= 10;
        passwordValidator.value.uppercase = /[A-Z]/.test(signUpData.value.password)
        passwordValidator.value.lowercase = /[a-z]/.test(signUpData.value.password)
        passwordValidator.value.number = /[0-9]/.test(signUpData.value.password)
        passwordValidator.value.symbols = /[!@#$%^&*()/?]/.test(signUpData.value.password)

    }

    const router = useRouter();

  
    const handleSubmit = async () => {
        try{

            signUpData.value.state = stateChosen.value;
            const response = await joinUsService.joinus(signUpData.value);
            const signUpResponse = await response.json();
            if(response.status === 400){
                Object.entries(signUpResponse.errors).forEach(([key, value]) => {
                    if(signUpError.hasOwnProperty(key)){
                        signUpError[key] = value[0];
                    }
                })
       
            }
            else{

                await router.push('/login')
            }

        }
        catch(error){
            console.err(error)
        }
     
    }


</script>

<template>
    <body>
        <div class="signup-container">
            <div class="signup-form-container">
                <form class="sign-entries" @submit.prevent="handleSubmit">
                    <h1 id="create-an-account-heading"> Become a member</h1>

                    <h2>Login Details</h2>
                    <div class="login-details-section">
                        <div class ="field">
                            <input id="email" placeholder="Email address" v-model="signUpData.email" :class="{'error-border': signUpError.email}"/>
                            <p v-if="signUpError.email" class="error-message">{{ signUpError.email }}</p>
                        </div>

                        <div class="field">
                            <input type="password" id="password" @input="passwordCheck" placeholder="Password" v-model="signUpData.password" :class="{'error-border': signUpError.password}" />
                            <p v-if="signUpError.password" class="error-message">{{ signUpError.password }}</p>
                            <ul class="password-requirement-section">
                                <li :class="{'password-accept': passwordValidator.minlength}">At least 10 characters</li>
                                <li :class="{'password-accept': passwordValidator.uppercase}">At least one upper-case letter</li>
                                <li :class="{'password-accept': passwordValidator.lowercase}">At least one lower-case letter</li>
                                <li :class="{'password-accept': passwordValidator.number}">At least one digit</li>
                                <li :class="{'password-accept': passwordValidator.symbols}">At least one symbol</li>


                            </ul>
                        </div>

                    </div>

                    <h2>Personal Details</h2>
                    <div class="personal-details-section">

                        <div class="name-section">
                            <div class="field">
                                <input type="text" id="first-name" v-model=signUpData.firstName placeholder="First Name" :class="{'error-border': signUpError.firstName}" />
                                <p v-if="signUpError.firstName" class="error-message">{{ signUpError.firstName }}</p>
                            </div>

                            <div class="field">
                                <input type="text" id="last-name" v-model=signUpData.lastName placeholder="Last Name" :class="{'error-border': signUpError.lastName}" />
                                <p v-if="signUpError.lastName" class="error-message">{{ signUpError.lastName }}</p>
                            </div>
                        </div>

                        <div class="other-personal-info-section">
                            <div class="field">
                                <input type="tel" id="mobile-phone" v-model=signUpData.mobilePhone placeholder="Mobile Phone" :class="{'error-border': signUpError.mobilePhone}" />
                                <p v-if="signUpError.mobilePhone" class="error-message">{{ signUpError.mobilePhone }}</p>
                            </div>
                            <div class="field">
                                <input type="text" v-model="signUpData.areaOfInterest" :class="{'error-border': signUpError.city}" id="areaOfInterestTextArea" placeholder="Area of Interest">
                                <p v-if="signUpError.areaOfInterest" class="error-message">{{ signUpError.areaOfInterest }}</p>
                            </div>
                        </div>

                    </div>



                    <h2>Address Details</h2>
                    <div class="address-details-section">
                        <div class="field">
                            <input type="text" id="street-name" :class="{'error-border': signUpError.streetName}" v-model=signUpData.streetName placeholder="Street Name"/>
                            <p v-if="signUpError.streetName" class="error-message">{{ signUpError.streetName }}</p>
                        </div>
                        
                        <div class="state-and-city-row">
                            <div class="field">
                                <input type="text" id="city" :class="{'error-border': signUpError.city}" v-model=signUpData.city placeholder="City"/>
                                <p v-if="signUpError.city" class="error-message">{{ signUpError.city }}</p>
                            </div> 

                            <div class="field">
                                <select v-model="stateChosen" id="state" :class="signUpError.state ? 'error-border' : 'input-valid'" required>
                                    <option v-for="state in stateOptions" :value="state.value" :disabled=state.placeholder :hidden=state.placeholder :selected=state.placeholder>
                                        {{ state.text }}
                                    </option>
                                </select>
                                <p v-if="signUpError.state" class="error-message">{{ signUpError.state }}</p>
                            </div>

                        </div>

                        <div class="field">
                            <input type="text" id="postcode" v-model=signUpData.postcode placeholder="Postcode" :class="{'error-border': signUpError.postcode}"/>
                            <p v-if="signUpError.postcode" class="error-message">{{ signUpError.postcode }}</p>
                        </div>

                    </div>
                    <button id="submitBtn" type="submit">Sign Up</button>
                    
                </form>
            </div>
        </div>
    </body>
</template>

<style scoped>
   
    .error-message{
        color: #c90e21;
        font-size: small;
        margin:0px;
        
    }
    .error-border{
        border: 1px solid #c90e21;
    }
    .input-valid{
        border: 1px solid #cbc8c8;
    }
    body{
        background-color: #F8F8F8;
        height: 140vh;
        /* padding-bottom: 1500px; */
        padding-bottom: 150vh;
    }
    .signup-container{
        min-height: 120vh;
        display: flex;
        justify-content: center;
        background-color: #F8F8F8;
    }

    
    .signup-form-container{
        display: flex;
        padding: 3rem;
        width: 50%;
        min-height:100vh;
        justify-content: center;
        /* align-items: center; */
        /* max-height: 100vh; */
        box-sizing: border-box;
        background-color: white;
        border-radius: 5px;
        margin-top: 1rem;
        margin-bottom: 20px;
        
    }

    .sign-entries{
        width: 100%;
        min-height: 100%;
        
    }



    .login-details-section{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    
    }

    ::placeholder{
        font-family: 'Inter', sans-serif;
        font-size: small;
        padding-left: 0.5rem;
    }



    h2{
      color: #EBBD6D;
      font-size: large;
      margin-bottom: 10px;
    }

    h3{
        color: #3A474E;
        font-size: large;
    }


    input, select{
        border-radius: 3px;
        border: 1px solid;
        background-color: #F8F8F8;
        border-color: #cbc8c8;
        height: 35px;
        width:100%;
    }
    
    

    h1{
        color: #ebae45;
        margin-bottom: 30px;
    }
  
    
    select{
        height: 35px;
        font-family: 'Inter', sans-serif;
        font-size: small;
        padding-left: 0.5rem;
        color: grey;
    }

    .field{
        padding: 0px;
        
        margin-bottom: 20px;
    }
  
    .name-section{
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(1, 1fr);
        column-gap: 10px;
        margin-top: 10px;
        
    }
    .state-and-city-row{
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(1, 1fr);
        column-gap: 10px;
    
    }

    
    #areaOfInterestTextArea{
        resize: none;
    }
    .password-accept{
        color: green;
        
    }
    .password-requirement-section{
        list-style-type: none;
        margin: 0;
        padding: 0;
        padding-top: 2px;
        font-size: 9px;
        color: #c90e21;
    }

    #submitBtn{
        position: relative;
        background-color: #ebae45;
        border: 0px;
        color: #FFFF;
        border-radius: 3px;
        margin: 30px 0px 25px 0px;
        height: 35px;
        width: 100%;
        font-size: small;
        font-family: 'Manrope', sans-serif;
        font-weight: bold;
    }

</style>