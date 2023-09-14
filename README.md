# PratilipiTest

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨


## Start the app

Make sure you have docker installed on your machine. If not, please install it from [here](https://docs.docker.com/get-docker/)

Run `docker compose up` to start the app. Navigate to `http://localhost:5000/docs`. The app will automatically reload if you change any of the source files.

## The Architecture
![Architecture Diagram](
    https://i.imgur.com/JW4yBqJ.png
)
The app consists of 3 Services:
- **Users Service & Gateway**: This service is responsible for handling all the user related operations. It exposes a REST API for the same. The gateway is responsible for routing the requests to the appropriate service. All requests to the app are routed through the gateway.
- **Interactions Service**: This service is responsible for handling all the interactions related operations. It exposes a RPC API for the same. It lets you add likes and dislikes to a story. It also lets you get the number of likes and dislikes for a story.
- **Content Service**: This service is responsible for handling all the content related operations. It exposes a RPC REST API for the same. It contains crud operation for it. It also contains a bulk api to add stories in a csv file.
**The Bulk api** : `/api/posts/bulk`
Use this schema to add stories in bulk. The csv file should contain the following columns:

    | id | title | story |
    | --- | --- | --- |
    | 1 | Story 1 | This is story 1 |
    | 2 | Story 2 | This is story 2 |

## The Database
postgres is used as the database for this app. It contains 3 databases:
- **users**: This database contains the users table. It contains the following columns:
    | id | name  | password |
    | --- | --- | --- |
    | 1 | User 1 | **** |

- **content**: This database contains the posts table. It contains the following columns:
    | id | title  | story | user_id | published_on |
    | --- | --- | --- | --- | --- |
    | 1 | Story 1 | This is story 1 | 2 | 2021-09-01 |
    | 2 | Story 2 | This is story 2 | 3 | 2021-09-01 |

- **interactions**: This database contains the interactions table. It contains the following columns:
    | id | resource_id  | user_id | type |
    | --- | --- | --- | --- |
    | 1 | 1 | 2 | like |
    | 2 | 2 | 3 | dislike |
  
