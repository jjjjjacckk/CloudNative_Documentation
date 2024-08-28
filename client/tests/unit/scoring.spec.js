import { createLocalVue, mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import VueRouter from 'vue-router';

const mockRoute = {
  params: {
    id: 1
  }
}
const mockRouter = {
  push: jest.fn()
}

const mockUid = '-N3hlfKxXwby0jSSDbxV'
describe('Home.vue', () => {
  it('first', async () => {
    // const localVue = createLocalVue();
    // localVue.use(VueRouter);

    // const mockVueRouter = new VueRouter();

    const wrapper = mount(Home, {
      // router: mockVueRouter,
      stubs: ['router-link', 'router-view'], 
      mock: {
        // s
      },
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      },
      setup() {
        const route = {params: {id: '123123'}};
        return { route }
      }, 
    });

    // // Assert that the button exists
    // const routerLinks = wrapper.findAllComponents({name: 'router-link'});
    // await wrapper.vm.$nextTick();
    // expect(routerLinks).toHaveLength(3);

    // // Assert that the button exists
    // expect(routerLinks.at(0)).toBeTruthy();
    // // Assert the button's text
    // expect(routerLinks.at(0).text()).toContain('返回');

    // // Simulate a click on the router-link component
    // await routerLinks.at(0).trigger('click');
    // await wrapper.vm.$nextTick();
    // // Assert that the expected navigation occurred
    // // expect(wrapper.vm.$route.path).toBe('/home/' + wrapper.vm.uid + '/team/' + wrapper.vm.$route.params.teamid + '/scoring/' + wrapper.vm.teamInfo.contestRecords[0].key);
    // expect(wrapper.vm.$route.path).toBe('/home/' + wrapper.vm.uid + '/team/' + wrapper.vm.teamid);

  });
})
