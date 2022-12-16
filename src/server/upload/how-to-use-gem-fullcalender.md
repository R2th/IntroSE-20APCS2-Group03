### Introducing
Full Calendar is an open source library. This is a library of javascript + jquery built with a good design, full of basic features for a Calendar and can be displayed in events on the calendar, helps manage jobs and tracks progress work more easily. This gem also allows us to use jQuery FullCalendar plugin, without having to download and install FullCalendar in assets.

### Let's create rails app
```markdown
rails new fullcalendar 
```
Gem that we need to add
```ruby
gem "fullcalendar-rails"
gem "momentjs-rails"
```
In `application.js` file we add
```javascript
//= require moment
//= require fullcalendar
```
And we need to add  `*= require fullcalendar` in file `application.scss`

Let's create a static_pages page
```go
rails g controller StaticPages index 
```

```html
static_pages / index.html.erb

<div class="calendar"></div>
```
Create model event 
```css
rails g model events name:string start_date:datetime end_date:datetime
```
```javascript
rails g controller events
```
```ruby
Rails.application.routes.draw do
  root 'static_pages#index'
  resources :events
end
```
After that we need to create a file  `full_calendar.js`
```javascript
var initialize_calendar;
initialize_calendar = function() {
  $('.calendar').each(function(){
    var calendar = $(this);
    calendar.fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events: '/events',

      select: function(start, end) {
        $.getScript('/events/new', function() {});

        calendar.fullCalendar('unselect');
      },

      eventDrop: function(event, delta, revertFunc) {
        event_data = {
          event: {
            id: event.id,
            start: event.start.format(),
            end: event.end.format()
          }
        };
        $.ajax({
            url: event.update_url,
            data: event_data,
            type: 'PATCH'
        });
      },

      eventClick: function(event, jsEvent, view) {
        $.getScript(event.edit_url, function() {});
      }
    });
  })
};
$(document).ready(function(){
  initialize_calendar();
});
```
Now we get fullcalender as below :
![](https://images.viblo.asia/1815452a-e094-422d-8c09-58030504586c.PNG)

Now let's try to create a event:
```cpp
class Event < ApplicationRecord
  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
end
```
```ruby
events_controller.rb

class EventsController < ApplicationController

  def index
    @events = Event.all
  end

  def new
    @event = Event.new
  end

  def create
    @event = Event.new event_params
    @event.save
  end

  private
  def event_params
    params.require(:event).permit(:name, :start_date, :end_date)
  end
end

```

```html
_new.html.erb

<div class="modal fade" id="new_event" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Create New Event</h4>
      </div>
      <div class="modal-body">
        <%= render 'form', event: @event %>
      </div>
    </div>
  </div>
</div>
```

```python
_event.json.jbuilder 

date_format ='%Y-%m-%d'

json.id event.id
json.name event.name
json.start event.start_date.strftime(date_format)
json.end event.end_date.strftime(date_format)
```
```html
_form.html.erb

<%= form_for @event, remote: true do |f| %>
  <%= f.label :name %>
  <%= f.text_field :name, class:"form-control" %>
  <%= f.label :start_date %>
  <%= f.date_field :start_date, class:"form-control"  %>
  <%= f.label :end_date %>
  <%= f.date_field :end_date, class:"form-control"  %>
  <%= f.button :submit, class:"btn btn-primary" %>
  <%= link_to 'Delete',
              event,
              method: :delete,
              class: 'btn btn-danger',
              data: { confirm: 'Are you sure?' },
              remote: true unless @event.new_record? %>
<% end %>
```

```sql
new.js.erb

$('#remote_container').html('<%= j render "new" %>');
$('#new_event').modal('show');
```

Now we can create event :
![](https://images.viblo.asia/05960ecc-ddd8-4289-a040-057dc10948c6.PNG)