import { createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router';
import login from '@/views/Login.vue'
  

// Mock the DatePicker component
jest.mock('vue3-datepicker', () => ({
    // Create a functional component as the mock implementation
    functional: true,
    // render(h, { slots }) {
    //   return slots.default();
    // },
    render(h) {
      return h('div', 'Mocked DatePicker');
    },
  }));
  
  
  
  // mock the Router
  const mockRouter = {
    push: jest.fn()
  }
  
  // mock the Route
  const mockRoute = {
    params: {
        id: '647df1c704778a001a263e75',
    }
  }
  
  // mock the uid
  const mockUid = '647df1c704778a001a263e75'
describe('Login.vue', () => {
    it('should update the loginUser', async () => {

        const wrapper = mount(login);
        const vm = wrapper.vm;

        // set value of loginUser
        vm.loginUser.account = 'test@example.com';
        vm.loginUser.password = 'password123';

        // assert value of loginUser 
        expect(vm.loginUser.account).toBe('test@example.com');
        expect(vm.loginUser.password).toBe('password123');

    });

    it('cannot login if user account is empty', async () => {
        const wrapper = mount(login, {
            stubs: ['router-link', 'router-view'], 
            mocks: {
                $router: mockRouter,
                $route: mockRoute
            },
        })
        
        // Get user account
        const accountName= wrapper.find('#account')
        // Modify the account
        await accountName.setValue('');

        // Find the button in the modal-footer
        const button = wrapper.find('button');
        // Assert that the button is disabled
         expect(button.attributes('disabled')).toBe('');
    });

    it('cannot login if user password is empty', async () => {
        const wrapper = mount(login, {
            stubs: ['router-link', 'router-view'], 
            mocks: {
                $router: mockRouter,
                $route: mockRoute
            },
        })
        
         // Get user password
         const passwordName= wrapper.find('#password')
         // Modify the password
         await passwordName.setValue('');
 
         // Find the button in the modal-footer
         const button = wrapper.find('button');
         // Assert that the button is disabled
         expect(button.attributes('disabled')).toBe('');
    });

    it('login btn is enabled if account and password are filled', async () => {
        const wrapper = mount(login, {
            stubs: ['router-link', 'router-view'], 
            mocks: {
                $router: mockRouter,
                $route: mockRoute
            },
        })
        // Get user account
        const accountName= wrapper.find('#account')

        // Modify the account
        await accountName.setValue('test');
        
        // Get user account
        const password= wrapper.find('#password')
        // Modify the account
        await password.setValue('123');

        // Find the button in the modal-footer
        const button = wrapper.find('button');
        // Assert that the button is enabled
        expect(button.attributes('disabled')).toBeUndefined();
    });
})